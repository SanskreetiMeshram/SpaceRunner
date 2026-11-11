/**
 * SpaceRunner Local Dev Server & Secure ElevenLabs TTS Proxy
 * -----------------------------------------------------------
 * Serves WebPreview/ on http://localhost:8080 and exposes /api/tts
 * when ELEVENLABS_API_KEY is configured in environment or .env.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = __dirname;
const WEB_DIR = path.join(ROOT_DIR, "WebPreview");
const ENV_PATH = path.join(ROOT_DIR, ".env");
const PORT = Number(process.env.PORT || 8080);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".ico": "image/x-icon"
};

function loadDotEnv() {
  if (!fs.existsSync(ENV_PATH)) return {};
  const vars = {};
  const lines = fs.readFileSync(ENV_PATH, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key) vars[key] = val;
  }
  return vars;
}

function getElevenLabsConfig() {
  const envFile = loadDotEnv();
  return {
    apiKey: (process.env.ELEVENLABS_API_KEY || envFile.ELEVENLABS_API_KEY || "").trim(),
    defaultVoiceId: (process.env.ELEVENLABS_VOICE_ID || envFile.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL").trim(),
    defaultModelId: (process.env.ELEVENLABS_MODEL_ID || envFile.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2").trim()
  };
}

function countPregeneratedCues() {
  const manifestPath = path.join(WEB_DIR, "Audio", "voice", "manifest.json");
  if (!fs.existsSync(manifestPath)) return 0;
  try {
    const data = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    return data && data.cues ? Object.keys(data.cues).length : 0;
  } catch (e) {
    return 0;
  }
}

function readJsonBody(req, maxBytes = 64 * 1024) {
  return new Promise((resolve, reject) => {
    let total = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > maxBytes) {
        reject(new Error("Request payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(new Error("Invalid JSON request body"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

async function handleTtsRequest(req, res) {
  const cfg = getElevenLabsConfig();
  if (!cfg.apiKey) {
    return sendJson(res, 401, { error: "ELEVENLABS_API_KEY is not configured in server environment or .env." });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (err) {
    return sendJson(res, 400, { error: err.message });
  }

  const text = String(body.text || "").trim();
  const voiceId = String(body.voiceId || cfg.defaultVoiceId).trim();
  const modelId = String(body.model_id || cfg.defaultModelId).trim();

  if (!text || text.length > 2500) {
    return sendJson(res, 400, { error: "Text must be between 1 and 2500 characters." });
  }
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(voiceId)) {
    return sendJson(res, 400, { error: "Invalid ElevenLabs voiceId format." });
  }

  try {
    const upstreamUrl = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`;
    const upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": cfg.apiKey
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: body.voice_settings || { stability: 0.45, similarity_boost: 0.80 }
      })
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      res.writeHead(upstream.status, { "Content-Type": "application/json; charset=utf-8" });
      res.end(errText);
      return;
    }

    const audioBuffer = Buffer.from(await upstream.arrayBuffer());
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length,
      "Cache-Control": "no-store"
    });
    res.end(audioBuffer);
  } catch (err) {
    sendJson(res, 502, { error: err.message || "Failed to contact ElevenLabs API." });
  }
}

function serveStaticFile(reqPath, res) {
  let decoded = "/";
  try {
    decoded = decodeURIComponent(reqPath.split("?")[0] || "/");
  } catch (e) {
    res.writeHead(400);
    res.end("Bad Request");
    return;
  }
  const relative = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
  const webRoot = path.resolve(WEB_DIR);
  const resolved = path.resolve(webRoot, relative);

  if (resolved !== webRoot && !resolved.startsWith(webRoot + path.sep)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(resolved, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }
    const ext = path.extname(resolved).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream"
    });
    res.end(data);
  });
}

function createAppServer() {
  return http.createServer((req, res) => {
    const urlPath = (req.url || "/").split("?")[0];

    if (req.method === "GET" && urlPath === "/api/voice-status") {
      const cfg = getElevenLabsConfig();
      return sendJson(res, 200, {
        proxyAvailable: true,
        serverKeyConfigured: Boolean(cfg.apiKey),
        pregeneratedCount: countPregeneratedCues()
      });
    }

    if (req.method === "POST" && urlPath === "/api/tts") {
      return handleTtsRequest(req, res);
    }

    if (req.method === "GET" || req.method === "HEAD") {
      return serveStaticFile(urlPath, res);
    }

    res.writeHead(405);
    res.end("Method Not Allowed");
  });
}

if (require.main === module) {
  const server = createAppServer();
  server.listen(PORT, () => {
    const cfg = getElevenLabsConfig();
    console.log(`SpaceRunner running at http://localhost:${PORT}`);
    console.log(`ElevenLabs local proxy ready (server key configured: ${Boolean(cfg.apiKey)})`);
  });
}

module.exports = { createAppServer };
