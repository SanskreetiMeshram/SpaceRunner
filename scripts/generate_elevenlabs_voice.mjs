/**
 * Pre-generates realistic ElevenLabs MP3 narration files into
 * WebPreview/Audio/voice/ and updates manifest.json.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=your_key node scripts/generate_elevenlabs_voice.mjs --scope core
 *   ELEVENLABS_API_KEY=your_key node scripts/generate_elevenlabs_voice.mjs --level 1
 *   ELEVENLABS_API_KEY=your_key node scripts/generate_elevenlabs_voice.mjs --scope all
 *   node scripts/generate_elevenlabs_voice.mjs --scope all --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const WEB_DIR = path.join(ROOT_DIR, "WebPreview");
const VOICE_OUT_DIR = path.join(WEB_DIR, "Audio", "voice");
const MANIFEST_PATH = path.join(VOICE_OUT_DIR, "manifest.json");
const ENV_PATH = path.join(ROOT_DIR, ".env");

const { SpeechScriptBuilder, ELEVENLABS_VOICES, fnv1aHex } = require(path.join(WEB_DIR, "voice.js"));

const LEVEL_SUMMARIES = [
  { level: 1, class: "Level 1", zone: "Playful Stardust", subjects: "Counting & Shapes", targetCoins: 5 },
  { level: 2, class: "Level 2", zone: "Candy Nebula", subjects: "Adding & Nature", targetCoins: 6 },
  { level: 3, class: "Level 3", zone: "Solar Outpost", subjects: "Multiplying & World", targetCoins: 7 },
  { level: 4, class: "Level 4", zone: "Lunar Base Alpha", subjects: "Fractions & Ecosystems", targetCoins: 8 },
  { level: 5, class: "Level 5", zone: "Asteroid Belt", subjects: "Decimals & Matter", targetCoins: 9 },
  { level: 6, class: "Level 6", zone: "Mars Orbit Station", subjects: "Ratios & Electricity", targetCoins: 10 },
  { level: 7, class: "Level 7", zone: "Saturn Rings", subjects: "Algebra & Acids", targetCoins: 11 },
  { level: 8, class: "Level 8", zone: "Uranus Rift", subjects: "Squares & Forces", targetCoins: 12 },
  { level: 9, class: "Level 9", zone: "Neptune Abyss", subjects: "Motion Laws & Atoms", targetCoins: 13 },
  { level: 10, class: "Level 10", zone: "Black Hole Core", subjects: "Quadratics & Genetics", targetCoins: 15 }
];

const SKIN_SUMMARIES = [
  { name: "Neo-Teal Fighter", desc: "Military emerald camo armor and cyan ion drive" },
  { name: "Solar Phoenix", desc: "Crimson gold armor with solar flare plasma" },
  { name: "Void Phantom", desc: "Obsidian stealth titanium and ultraviolet pulse" },
  { name: "Cyberpunk Nova", desc: "Neon magenta hyperdrive with hot pink flame" }
];

function loadDotEnv() {
  if (!fs.existsSync(ENV_PATH)) return {};
  const vars = {};
  for (const line of fs.readFileSync(ENV_PATH, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq > 0) {
      vars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  return vars;
}

function parseArgs(argv) {
  const opts = { scope: "core", level: null, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--scope" && argv[i + 1]) opts.scope = argv[++i];
    else if (a === "--level" && argv[i + 1]) opts.level = Number(argv[++i]);
    else if (a === "--dry-run") opts.dryRun = true;
  }
  return opts;
}

function collectCues(opts) {
  const cues = [];
  const pushCue = (item) => {
    if (item && item.cueId && item.text) cues.push(item);
  };

  pushCue(SpeechScriptBuilder.startWelcome());
  for (let lvl = 1; lvl <= 10; lvl++) {
    pushCue(SpeechScriptBuilder.missionMapBrief(lvl));
  }
  for (const cfg of LEVEL_SUMMARIES) {
    pushCue(SpeechScriptBuilder.levelIntro(cfg));
  }
  for (const skin of SKIN_SUMMARIES) {
    pushCue(SpeechScriptBuilder.skinEquipped(skin.name, skin.desc));
  }

  if (opts.scope === "all" || opts.level) {
    const bankDir = path.join(WEB_DIR, "QuestionBanks");
    const files = fs.readdirSync(bankDir).filter((f) => /^level_\d+\.json$/.test(f)).sort();
    for (const file of files) {
      const levelNum = Number(file.match(/\d+/)[0]);
      if (opts.level && levelNum !== opts.level) continue;
      const bank = JSON.parse(fs.readFileSync(path.join(bankDir, file), "utf8"));
      for (const q of bank.questions || []) {
        pushCue(SpeechScriptBuilder.questionPrompt(q));
        if (q.hint) pushCue(SpeechScriptBuilder.questionHint(q));
        pushCue(SpeechScriptBuilder.learnExplanation(q, null));
      }
    }
  }

  return cues;
}

async function synthesizeToFile(apiKey, voiceId, modelId, text, outPath) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "audio/mpeg",
      "Content-Type": "application/json",
      "xi-api-key": apiKey
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: { stability: 0.45, similarity_boost: 0.80 }
    })
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`ElevenLabs HTTP ${res.status}: ${body}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const envVars = loadDotEnv();
  const apiKey = (process.env.ELEVENLABS_API_KEY || envVars.ELEVENLABS_API_KEY || "").trim();
  const voiceId = (process.env.ELEVENLABS_VOICE_ID || envVars.ELEVENLABS_VOICE_ID || ELEVENLABS_VOICES[0].id).trim();
  const modelId = (process.env.ELEVENLABS_MODEL_ID || envVars.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2").trim();

  const cues = collectCues(opts);
  const totalChars = cues.reduce((sum, c) => sum + c.text.length, 0);
  console.log(`Prepared ${cues.length} ElevenLabs voice cues (${totalChars} total characters) for scope="${opts.scope}"${opts.level ? ` level=${opts.level}` : ""}.`);

  if (opts.dryRun) {
    console.log("Dry-run complete. No ElevenLabs API calls made.");
    return;
  }
  if (!apiKey) {
    console.error("Error: ELEVENLABS_API_KEY is not set in environment or .env.");
    process.exit(1);
  }

  fs.mkdirSync(VOICE_OUT_DIR, { recursive: true });
  let manifest = { voiceId, modelId, cues: {}, hashes: {} };
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
      manifest.cues = manifest.cues || {};
      manifest.hashes = manifest.hashes || {};
    } catch (e) {}
  }

  let generated = 0;
  let skipped = 0;

  for (const cue of cues) {
    const textHash = fnv1aHex(cue.text);
    const filename = `${cue.cueId}_${textHash.slice(0, 8)}.mp3`;
    const filePath = path.join(VOICE_OUT_DIR, filename);

    if (fs.existsSync(filePath) && manifest.cues[cue.cueId] === filename) {
      skipped++;
      continue;
    }

    await synthesizeToFile(apiKey, voiceId, modelId, cue.text, filePath);
    manifest.voiceId = voiceId;
    manifest.modelId = modelId;
    manifest.cues[cue.cueId] = filename;
    manifest.hashes[textHash] = filename;
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    generated++;
    console.log(`[${generated + skipped}/${cues.length}] Generated ${filename}`);
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log(`Done! Generated ${generated} new MP3 files, skipped ${skipped} cached files.`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
