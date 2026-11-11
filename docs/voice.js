/**
 * SpaceRunner ElevenLabs Realistic Voice & Educational Tutor Engine
 * -----------------------------------------------------------------
 * Uses genuine ElevenLabs neural voices (no robotic browser SpeechSynthesis)
 * with three-tier audio delivery:
 *   1. Pre-generated MP3 voice pack (WebPreview/Audio/voice/manifest.json)
 *   2. Persistent browser IndexedDB blob cache (zero redundant API calls)
 *   3. Local proxy (/api/tts) or user-configured ElevenLabs API key in localStorage
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    const api = factory();
    root.ELEVENLABS_VOICES = api.ELEVENLABS_VOICES;
    root.ELEVENLABS_MODELS = api.ELEVENLABS_MODELS;
    root.SpeechScriptBuilder = api.SpeechScriptBuilder;
    root.ElevenLabsVoiceEngine = api.ElevenLabsVoiceEngine;
  }
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  "use strict";

  const ELEVENLABS_VOICES = [
    {
      key: "nova",
      id: "EXAVITQu4vr4xnSDxMaL",
      name: "Nova Tutor (Sarah)",
      badge: "Recommended",
      accent: "American",
      description: "Warm, reassuring & expressive science and math tutor",
      stability: 0.45,
      similarity_boost: 0.80
    },
    {
      key: "aria",
      id: "9BWtsMINqrJLrRacOk9x",
      name: "Aria Explorer",
      badge: "Expressive",
      accent: "American",
      description: "Bright, enthusiastic guide with natural storytelling cadence",
      stability: 0.42,
      similarity_boost: 0.78
    },
    {
      key: "rachel",
      id: "21m00Tcm4TlvDq8ikWAM",
      name: "Rachel Mentor",
      badge: "Calm",
      accent: "American",
      description: "Gentle, articulate, crystal-clear step-by-step teacher",
      stability: 0.50,
      similarity_boost: 0.78
    },
    {
      key: "charlie",
      id: "IKne3meq5aSn9XLyUdCD",
      name: "Commander Charlie",
      badge: "Energetic",
      accent: "Australian",
      description: "Upbeat, motivating starfighter squadron commander",
      stability: 0.48,
      similarity_boost: 0.78
    }
  ];

  const ELEVENLABS_MODELS = [
    {
      id: "eleven_multilingual_v2",
      name: "Multilingual v2 (Most Realistic)",
      description: "Richest human expression, warmth, and teaching intonation."
    },
    {
      id: "eleven_flash_v2_5",
      name: "Flash v2.5 (Fastest Response)",
      description: "Ultra-low latency neural speech and lower credit usage."
    }
  ];

  const SUBSCRIPT_MAP = {
    "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
    "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9"
  };

  const SUPERSCRIPT_POWER_MAP = {
    "⁰": "0", "¹": "1", "⁴": "4", "⁵": "5", "⁶": "6",
    "⁷": "7", "⁸": "8", "⁹": "9", "ⁿ": "n", "ᵐ": "m"
  };

  /**
   * Computes a deterministic FNV-1a 64-bit hex hash so browser and Node
   * scripts generate identical cache keys / filenames without dependencies.
   */
  function fnv1aHex(str) {
    let h1 = 0x811c9dc5;
    let h2 = 0x9e3779b9;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 ^= ch;
      h1 = Math.imul(h1, 0x01000193);
      h2 ^= (ch + i) & 0xff;
      h2 = Math.imul(h2, 0x85ebca6b);
    }
    return ((h1 >>> 0).toString(16).padStart(8, "0")) + ((h2 >>> 0).toString(16).padStart(8, "0"));
  }

  /**
   * Formats raw educational questions, formulas, and explanations into
   * smooth, natural spoken English suitable for a realistic human tutor.
   */
  class SpeechScriptBuilder {
    static normalizeForSpeech(rawText, options = {}) {
      if (!rawText) return "";
      let text = String(rawText);

      // Handle visual star counting symbols cleanly without spoiling quiz answers
      if (options.hideVisualStars) {
        text = text.replace(/:\s*(?:★\s*)+\?/g, " shown on screen?");
        text = text.replace(/(?:★\s*)+/g, " shown on screen ");
      } else {
        text = text.replace(/(?:★\s*)+/g, (match) => {
          const count = (match.match(/★/g) || []).length;
          return ` ${count} ${count === 1 ? "star" : "stars"} `;
        });
      }

      // Remove emojis & variation selectors so TTS doesn't insert odd pauses
      text = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, " ");

      // Replace scientific units before general fractions/powers
      text = text
        .replace(/\bkm\/h\b/gi, "kilometers per hour")
        .replace(/\bm\/s²\b/gi, "meters per second squared")
        .replace(/\bm\/s\^2\b/gi, "meters per second squared")
        .replace(/\bm\/s\b/gi, "meters per second")
        .replace(/\bsq\s*cm\b/gi, "square centimeters")
        .replace(/\bcubic\s*cm\b/gi, "cubic centimeters")
        .replace(/\bcm²\b/gi, "square centimeters")
        .replace(/\bm²\b/gi, "square meters")
        .replace(/\bkm²\b/gi, "square kilometers")
        .replace(/\bcm³\b/gi, "cubic centimeters")
        .replace(/\bm³\b/gi, "cubic meters")
        .replace(/(\d+(?:\.\d+)?)\s*Hz\b/gi, "$1 hertz")
        .replace(/°C\b/g, " degrees Celsius")
        .replace(/°F\b/g, " degrees Fahrenheit")
        .replace(/°/g, " degrees")
        .replace(/₹\s*([\d,]+)/g, (_, amt) => `${amt.replace(/,/g, "")} rupees`)
        .replace(/₹/g, " rupees ");

      // Subscripts like H₂O, CO₂, SO₄ -> spaced chemical elements
      text = text.replace(/([A-Za-z])([₀₁₂₃₄₅₆₇₈₉]+)/g, (_, elem, subs) => {
        const digits = subs.split("").map((c) => SUBSCRIPT_MAP[c] || c).join("");
        const spacedElem = elem.length > 1 ? elem : elem;
        return `${spacedElem} ${digits} `;
      });
      text = text.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => ` ${SUBSCRIPT_MAP[c] || c}`);

      // Common chemical letter sequences attached to digits like H2O / Fe2O3
      text = text.replace(/\bCO2\b/g, "C O 2").replace(/\bH2O\b/g, "H 2 O").replace(/\bO2\b/g, "O 2");

      // Exponents & math powers
      text = text
        .replace(/²/g, " squared")
        .replace(/³/g, " cubed")
        .replace(/⁺/g, " plus ")
        .replace(/[⁰¹⁴⁵⁶⁷⁸⁹ⁿᵐ]/g, (c) => ` to the power of ${SUPERSCRIPT_POWER_MAP[c] || c}`);

      // Square root & math/science operators
      text = text
        .replace(/√\s*\(([^)]+)\)/g, " square root of $1 ")
        .replace(/√\s*([A-Za-z0-9]+)/g, " square root of $1 ")
        .replace(/±/g, " plus or minus ")
        .replace(/×/g, " times ")
        .replace(/÷/g, " divided by ")
        .replace(/≈/g, " is approximately ")
        .replace(/≠/g, " is not equal to ")
        .replace(/∝/g, " is proportional to ")
        .replace(/→|=>/g, " leads to ")
        .replace(/Ω/g, " ohms ")
        .replace(/π/g, " pi ")
        .replace(/θ/g, " theta ")
        .replace(/·/g, " dot ")
        .replace(/>=/g, " is greater than or equal to ")
        .replace(/<=/g, " is less than or equal to ")
        .replace(/=/g, " equals ")
        .replace(/>/g, " is greater than ")
        .replace(/</g, " is less than ");

      // Addition & subtraction operators
      text = text
        .replace(/\(\s*([+-])\s*,\s*([+-])\s*\)/g, (_, s1, s2) => {
          return `(${s1 === "+" ? "positive" : "negative"}, ${s2 === "+" ? "positive" : "negative"})`;
        })
        .replace(/(\s)\+(?=\s)/g, "$1plus")
        .replace(/\(\s*-([A-Za-z]|\d+(?:\/\d+)?)\b/g, "(negative $1")
        .replace(/(\s)-(?=\s)/g, "$1minus")
        .replace(/(\s)-(\d+(?:\.\d+)?)\b/g, "$1negative $2");

      // Ratios (e.g., 15 : 25) and fractions / spaced division (m / a, 2a / b, 1/2)
      text = text.replace(/(\d+)\s*:\s*(\d+)/g, "$1 to $2");
      text = text
        .replace(/(\s)\/(?=\s)/g, "$1divided by")
        .replace(/\b1\/2\b/g, "one half")
        .replace(/\b1\/3\b/g, "one third")
        .replace(/\b2\/3\b/g, "two thirds")
        .replace(/\b1\/4\b/g, "one quarter")
        .replace(/\b3\/4\b/g, "three quarters")
        .replace(/\b(\d+)\/(\d+)\b/g, "$1 over $2")
        .replace(/\b([A-Za-z])\/([A-Za-z])\b/g, "$1 over $2");

      // Algebraic multi-letter coefficients common in quizzes (ax, bx, ac)
      text = text
        .replace(/\bax\b/g, "a x")
        .replace(/\bbx\b/g, "b x")
        .replace(/\b4ac\b/g, "4 a c")
        .replace(/\b([0-9]+)x\b/g, "$1 x")
        .replace(/\b([0-9]+)y\b/g, "$1 y");

      // Clean spacing & ensure gentle pauses
      return text
        .replace(/Step\s+(\d+):/gi, "Step $1.")
        .replace(/\s+([?.!,;:])/g, "$1")
        .replace(/\s{2,}/g, " ")
        .trim();
    }

    static startWelcome() {
      return {
        cueId: "cue_start_welcome",
        subtitle: "Welcome aboard, Space Cadet! Ready to launch your mission?",
        text: "Welcome aboard, Space Cadet! I am Nova, your mission guide. Tap Launch Mission to blast alien U F Os, dodge asteroids, and supercharge your brain across ten galaxy levels!"
      };
    }

    static missionMapBrief(highestLevel = 1) {
      return {
        cueId: `cue_map_brief_l${highestLevel}`,
        subtitle: `Cosmic Mission Trail — Level ${highestLevel} ready for takeoff!`,
        text: `Welcome to the Cosmic Mission Trail! You currently have up to Level ${highestLevel} unlocked. Pick any unlocked galaxy zone to fly your starfighter, or click Quick Play to jump straight into the action!`
      };
    }

    static levelIntro(config) {
      return {
        cueId: `cue_level_${config.level}_intro`,
        subtitle: `${config.class}: ${config.zone} — Blast ${config.targetCoins} UFOs!`,
        text: `Launching ${config.class}, ${config.zone}! Today's subjects are ${config.subjects}. Steer with the arrow keys or W A S D, dodge incoming asteroids, and press Shift whenever you want to blast an alien U F O and answer a quiz!`
      };
    }

    static questionPrompt(q) {
      const qSpeech = this.normalizeForSpeech(q.questionText, { hideVisualStars: true });
      const opts = (q.options || []).map((opt, idx) => {
        const label = ["A", "B", "C", "D"][idx] || `${idx + 1}`;
        return `Option ${label}: ${this.normalizeForSpeech(opt)}`;
      });
      return {
        cueId: `q_${q.id}_prompt`,
        subtitle: `${q.subject}: ${q.questionText}`,
        text: `Great shot, Cadet! Here is your ${q.subject} question on ${q.topic}. ${qSpeech} ... ${opts.join(". ... ")}.`
      };
    }

    static questionHint(q) {
      const hintSpeech = this.normalizeForSpeech(q.hint || "Take your time and read every choice carefully.");
      return {
        cueId: `q_${q.id}_hint`,
        subtitle: `Magic Hint: ${q.hint || "Read carefully!"}`,
        text: `Here is a helpful hint! ${hintSpeech}`
      };
    }

    static answerCorrect(q, variantIndex = 0) {
      const praises = [
        "Super star! That answer is spot on!",
        "Brilliant flying, Cadet! You nailed it!",
        "Awesome job! Your space shields are powered up!",
        "Right on target! You mastered that question!"
      ];
      const praise = praises[variantIndex % praises.length];
      const correctOpt = q && q.options ? this.normalizeForSpeech(q.options[q.correctIndex]) : "";
      const summary = correctOpt ? ` ${correctOpt} is completely right!` : "";
      return {
        cueId: `q_${q ? q.id : "generic"}_correct_${variantIndex % praises.length}`,
        subtitle: `${praise}`,
        text: `${praise}${summary}`
      };
    }

    static learnExplanation(q, chosenIdx) {
      const hasChosen = typeof chosenIdx === "number" && q.options && q.options[chosenIdx] !== undefined;
      const chosenSpeech = hasChosen ? this.normalizeForSpeech(q.options[chosenIdx]) : "";
      const correctSpeech = q.options ? this.normalizeForSpeech(q.options[q.correctIndex]) : "";
      const qSpeech = this.normalizeForSpeech(q.questionText, { hideVisualStars: false });
      const steps = (q.solutionSteps || []).map((step, i) => `Step ${i + 1}. ${this.normalizeForSpeech(step)}`);

      const intro = hasChosen
        ? `Good try, Cadet! You picked ${chosenSpeech}, which wasn't quite it. Let's learn why together.`
        : `Let's walk through this question step by step.`;

      return {
        cueId: hasChosen ? `q_${q.id}_learn_${chosenIdx}` : `q_${q.id}_learn_all`,
        subtitle: `Step-by-step explanation: ${q.options ? q.options[q.correctIndex] : ""}`,
        text: `${intro} The question asks: ${qSpeech} ... The correct answer is ${correctSpeech}. ... ${steps.join(" ... ")} ... Now you have got it! Hit Try Again or Continue Flying whenever you are ready.`
      };
    }

    static reviewCard(q, index) {
      const qSpeech = this.normalizeForSpeech(q.questionText, { hideVisualStars: false });
      const correctSpeech = q.options ? this.normalizeForSpeech(q.options[q.correctIndex]) : "";
      const steps = (q.solutionSteps || []).map((step, i) => `Step ${i + 1}. ${this.normalizeForSpeech(step)}`);
      const tip = q.hint ? ` Learning tip: ${this.normalizeForSpeech(q.hint)}` : "";
      return {
        cueId: `q_${q.id}_review`,
        subtitle: `Question ${index + 1} Solution (${q.subject})`,
        text: `Question ${index + 1}, in ${q.subject}, on ${q.topic}. ${qSpeech} ... The correct answer is ${correctSpeech}. Here is the step-by-step solution. ... ${steps.join(" ... ")}${tip}`
      };
    }

    static levelComplete(config, stats) {
      const { stars, score, coins, accuracyPct, topSubject } = stats;
      const starWord = stars === 1 ? "1 star" : `${stars} out of 3 stars`;
      const subjectClause = topSubject
        ? ` Your strongest subject was ${topSubject.name} with ${topSubject.pct} percent accuracy.`
        : "";
      return {
        cueId: null,
        subtitle: `${config.class} Cleared! ${stars}/3 Stars • ${accuracyPct}% Accuracy`,
        text: `Congratulations, Cadet! You cleared ${config.class}, ${config.zone}, earning ${starWord}! You blasted ${coins} U F Os, scored ${score} points, and achieved ${accuracyPct} percent accuracy.${subjectClause} Ready for the next mission?`
      };
    }

    static gameOver(levelNum, coins) {
      const ufoPhrase = coins === 1 ? "1 U F O" : `${coins} U F Os`;
      return {
        cueId: null,
        subtitle: "Shields depleted — recharge and fly again!",
        text: `Hold steady, Space Cadet! Your shields ran out on Level ${levelNum}, after blasting ${ufoPhrase}. Every flight makes you a sharper pilot. Click Recharge and Try Again when you are ready!`
      };
    }

    static skinEquipped(skinName, desc) {
      return {
        cueId: `cue_skin_${String(skinName).toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
        subtitle: `${skinName} equipped!`,
        text: `${this.normalizeForSpeech(skinName)} equipped! ${this.normalizeForSpeech(desc)}. Looking ready for deep space, Cadet!`
      };
    }
  }

  /**
   * Persistent IndexedDB blob cache for ElevenLabs MP3 audio.
   */
  class VoiceBlobCache {
    constructor() {
      this.dbPromise = null;
      this.memoryMap = new Map();
    }

    openDB() {
      if (typeof indexedDB === "undefined") return Promise.resolve(null);
      if (this.dbPromise) return this.dbPromise;
      this.dbPromise = new Promise((resolve) => {
        try {
          const req = indexedDB.open("SpaceRunnerVoiceDB", 1);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("clips")) {
              db.createObjectStore("clips");
            }
          };
          req.onsuccess = (e) => resolve(e.target.result);
          req.onerror = () => resolve(null);
        } catch (err) {
          resolve(null);
        }
      });
      return this.dbPromise;
    }

    async get(key) {
      if (this.memoryMap.has(key)) return this.memoryMap.get(key);
      const db = await this.openDB();
      if (!db) return null;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction("clips", "readonly");
          const store = tx.objectStore("clips");
          const req = store.get(key);
          req.onsuccess = () => {
            if (req.result) this.memoryMap.set(key, req.result);
            resolve(req.result || null);
          };
          req.onerror = () => resolve(null);
        } catch (err) {
          resolve(null);
        }
      });
    }

    async set(key, blob) {
      this.memoryMap.set(key, blob);
      const db = await this.openDB();
      if (!db) return;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction("clips", "readwrite");
          const store = tx.objectStore("clips");
          const req = store.put(blob, key);
          req.onsuccess = () => resolve();
          req.onerror = () => resolve();
        } catch (err) {
          resolve();
        }
      });
    }

    async count() {
      const db = await this.openDB();
      if (!db) return this.memoryMap.size;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction("clips", "readonly");
          const store = tx.objectStore("clips");
          const req = store.count();
          req.onsuccess = () => resolve(req.result || 0);
          req.onerror = () => resolve(this.memoryMap.size);
        } catch (err) {
          resolve(this.memoryMap.size);
        }
      });
    }

    async clear() {
      this.memoryMap.clear();
      const db = await this.openDB();
      if (!db) return;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction("clips", "readwrite");
          const store = tx.objectStore("clips");
          const req = store.clear();
          req.onsuccess = () => resolve();
          req.onerror = () => resolve();
        } catch (err) {
          resolve();
        }
      });
    }
  }

  /**
   * Main realistic ElevenLabs TTS engine used by SpaceGame3D.
   */
  class ElevenLabsVoiceEngine {
    constructor(options = {}) {
      this.STORAGE_SETTINGS_KEY = "spacerunner_voice_settings_v1";
      this.STORAGE_API_KEY = "spacerunner_elevenlabs_key";

      this.cache = new VoiceBlobCache();
      this.manifest = null;
      this.manifestLoaded = false;
      this.initPromise = null;
      this.serverStatus = { proxyAvailable: false, serverKeyConfigured: false };

      this.currentAudio = null;
      this.currentObjectUrl = null;
      this.activeAbortController = null;
      this.lastSpokenPayload = null;
      this.pendingAutoplayPayload = null;
      this.playbackToken = 0;

      this.onStateChange = typeof options.onStateChange === "function" ? options.onStateChange : () => {};
      this.settings = this.loadSettings();
      this.apiKey = this.loadApiKey();

      this.state = {
        status: "idle", // idle | loading | speaking | needs_key | blocked_autoplay | error
        subtitle: "",
        errorMessage: "",
        sourceLabel: "ElevenLabs"
      };
    }

    loadSettings() {
      const defaults = {
        enabled: true,
        autoNarrateScreens: true,
        autoReadQuestions: true,
        autoExplainSolutions: true,
        voiceId: ELEVENLABS_VOICES[0].id,
        voiceName: ELEVENLABS_VOICES[0].name,
        modelId: ELEVENLABS_MODELS[0].id,
        speed: 1.0,
        stability: 0.45,
        similarityBoost: 0.80
      };
      try {
        const raw = localStorage.getItem(this.STORAGE_SETTINGS_KEY);
        if (!raw) return defaults;
        return { ...defaults, ...JSON.parse(raw) };
      } catch (e) {
        return defaults;
      }
    }

    saveSettings(patch = {}) {
      this.settings = { ...this.settings, ...patch };
      try {
        localStorage.setItem(this.STORAGE_SETTINGS_KEY, JSON.stringify(this.settings));
      } catch (e) {}
      if (!this.settings.enabled) {
        this.stop();
      }
      this.emitState();
    }

    loadApiKey() {
      try {
        return (localStorage.getItem(this.STORAGE_API_KEY) || "").trim();
      } catch (e) {
        return "";
      }
    }

    setApiKey(key) {
      this.apiKey = String(key || "").trim();
      try {
        if (this.apiKey) {
          localStorage.setItem(this.STORAGE_API_KEY, this.apiKey);
        } else {
          localStorage.removeItem(this.STORAGE_API_KEY);
        }
      } catch (e) {}
      this.emitState();
    }

    hasLiveAccess() {
      return Boolean(this.apiKey || this.serverStatus.serverKeyConfigured);
    }

    getPregeneratedCount() {
      if (!this.manifest || !this.manifest.cues) return 0;
      return Object.keys(this.manifest.cues).length;
    }

    init() {
      if (!this.initPromise) {
        this.initPromise = Promise.all([this.loadManifest(), this.detectLocalProxy()]).then(() => {
          this.bindGestureUnlock();
          this.emitState();
        });
      }
      return this.initPromise;
    }

    async loadManifest() {
      if (this.manifestLoaded) return this.manifest;
      this.manifestLoaded = true;
      try {
        const res = await fetch("Audio/voice/manifest.json", { cache: "no-store" });
        if (res.ok) {
          this.manifest = await res.json();
        }
      } catch (e) {
        this.manifest = null;
      }
      return this.manifest;
    }

    async detectLocalProxy() {
      if (typeof window === "undefined") return;
      const host = window.location.hostname;
      if (host !== "localhost" && host !== "127.0.0.1") return;
      try {
        const res = await fetch("/api/voice-status", { cache: "no-store" });
        if (res.ok) {
          this.serverStatus = await res.json();
        }
      } catch (e) {
        this.serverStatus = { proxyAvailable: false, serverKeyConfigured: false };
      }
    }

    bindGestureUnlock() {
      if (typeof window === "undefined") return;
      const unlockHandler = () => {
        if (this.pendingAutoplayPayload && this.settings.enabled) {
          const payload = this.pendingAutoplayPayload;
          this.pendingAutoplayPayload = null;
          this.speak(payload, { force: true });
        }
      };
      window.addEventListener("pointerdown", unlockHandler, { passive: true });
      window.addEventListener("keydown", unlockHandler, { passive: true });
    }

    setState(patch) {
      this.state = { ...this.state, ...patch };
      this.emitState();
    }

    emitState() {
      this.onStateChange({
        ...this.state,
        enabled: this.settings.enabled,
        voiceId: this.settings.voiceId,
        voiceName: this.settings.voiceName,
        modelId: this.settings.modelId,
        hasLiveAccess: this.hasLiveAccess(),
        pregeneratedCount: this.getPregeneratedCount()
      });
    }

    stop() {
      this.playbackToken++;
      this.pendingAutoplayPayload = null;
      if (this.activeAbortController) {
        try {
          this.activeAbortController.abort();
        } catch (e) {}
        this.activeAbortController = null;
      }
      if (this.currentAudio) {
        try {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
        } catch (e) {}
        this.currentAudio = null;
      }
      if (this.currentObjectUrl) {
        try {
          URL.revokeObjectURL(this.currentObjectUrl);
        } catch (e) {}
        this.currentObjectUrl = null;
      }
      if (this.state.status !== "idle") {
        this.setState({ status: "idle", errorMessage: "" });
      }
    }

    async replayLast() {
      if (!this.lastSpokenPayload) return false;
      return this.speak(this.lastSpokenPayload, { force: true });
    }

    findManifestEntry(cueId, cleanText) {
      if (!this.manifest) return null;
      if (cueId && this.manifest.cues && this.manifest.cues[cueId]) {
        return this.manifest.cues[cueId];
      }
      const textHash = fnv1aHex(cleanText);
      if (this.manifest.hashes && this.manifest.hashes[textHash]) {
        return this.manifest.hashes[textHash];
      }
      return null;
    }

    /**
     * Synthesizes (or retrieves from static pack / IndexedDB cache) realistic
     * ElevenLabs MP3 audio and plays it cleanly. Never invokes robotic speechSynthesis.
     */
    async speak(payloadOrText, options = {}) {
      const payload = typeof payloadOrText === "string"
        ? { text: payloadOrText, subtitle: payloadOrText, cueId: options.cueId || null }
        : { ...payloadOrText };

      if (!payload || !payload.text) return false;
      this.lastSpokenPayload = payload;

      if (!this.settings.enabled && !options.force) {
        return false;
      }

      const category = options.category || "general";
      if (!options.force) {
        if (category === "screen" && !this.settings.autoNarrateScreens) return false;
        if (category === "question" && !this.settings.autoReadQuestions) return false;
        if (category === "learn" && !this.settings.autoExplainSolutions) return false;
      }

      this.stop();
      const myToken = this.playbackToken;
      const cleanText = String(payload.text).trim();
      const subtitle = payload.subtitle || cleanText;

      this.setState({
        status: "loading",
        subtitle,
        errorMessage: ""
      });

      if (this.initPromise) {
        await this.initPromise;
        if (myToken !== this.playbackToken) return false;
      }

      try {
        let audioSrc = null;
        let isObjectUrl = false;
        let sourceLabel = "ElevenLabs";

        // Tier 1: Pre-generated MP3 audio pack (when using default voice or when no live key exists)
        const manifestFile = this.findManifestEntry(payload.cueId, cleanText);
        const matchesPregenVoice = !this.manifest || !this.manifest.voiceId || this.manifest.voiceId === this.settings.voiceId;
        if (manifestFile && (matchesPregenVoice || !this.hasLiveAccess())) {
          audioSrc = `Audio/voice/${manifestFile}`;
          sourceLabel = "ElevenLabs Pack";
        }

        // Tier 2: Persistent IndexedDB cache
        const cacheKey = fnv1aHex(`${this.settings.voiceId}|${this.settings.modelId}|${cleanText}`);
        if (!audioSrc) {
          const cachedBlob = await this.cache.get(cacheKey);
          if (myToken !== this.playbackToken) return false;
          if (cachedBlob) {
            audioSrc = URL.createObjectURL(cachedBlob);
            isObjectUrl = true;
            sourceLabel = "ElevenLabs Cached";
          }
        }

        // Tier 3 / 4: Live ElevenLabs synthesis via local proxy or direct browser fetch
        if (!audioSrc) {
          if (!this.hasLiveAccess()) {
            this.setState({
              status: "needs_key",
              subtitle,
              errorMessage: "Add your ElevenLabs API key in Voice Studio to hear Nova explain in a realistic voice."
            });
            return false;
          }

          const controller = new AbortController();
          this.activeAbortController = controller;
          const blob = await this.fetchSpeechBlob(cleanText, controller.signal);
          if (myToken !== this.playbackToken) return false;

          await this.cache.set(cacheKey, blob);
          if (myToken !== this.playbackToken) return false;

          audioSrc = URL.createObjectURL(blob);
          isObjectUrl = true;
          sourceLabel = `ElevenLabs (${this.settings.voiceName.split(" ")[0]})`;
        }

        return await this.playAudioSource(audioSrc, isObjectUrl, subtitle, sourceLabel, payload, myToken);
      } catch (err) {
        if (err && err.name === "AbortError") return false;
        if (myToken !== this.playbackToken) return false;
        this.setState({
          status: "error",
          subtitle,
          errorMessage: err && err.message ? err.message : "Could not reach ElevenLabs TTS."
        });
        return false;
      }
    }

    async fetchSpeechBlob(text, signal) {
      const voiceProfile = ELEVENLABS_VOICES.find((v) => v.id === this.settings.voiceId) || ELEVENLABS_VOICES[0];
      const payload = {
        text,
        voiceId: this.settings.voiceId,
        model_id: this.settings.modelId,
        voice_settings: {
          stability: this.settings.stability ?? voiceProfile.stability,
          similarity_boost: this.settings.similarityBoost ?? voiceProfile.similarity_boost
        }
      };

      // Use local Node proxy when configured cleanly via server .env
      if (this.serverStatus.proxyAvailable && this.serverStatus.serverKeyConfigured && !this.apiKey) {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal
        });
        if (!res.ok) {
          const msg = await this.readErrorResponse(res);
          throw new Error(msg);
        }
        return await res.blob();
      }

      if (!this.apiKey) {
        throw new Error("Missing ElevenLabs API key.");
      }

      const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(this.settings.voiceId)}?output_format=mp3_44100_128`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": this.apiKey
        },
        body: JSON.stringify({
          text: payload.text,
          model_id: payload.model_id,
          voice_settings: payload.voice_settings
        }),
        signal
      });

      if (!res.ok) {
        const msg = await this.readErrorResponse(res);
        throw new Error(msg);
      }
      return await res.blob();
    }

    async readErrorResponse(res) {
      try {
        const text = await res.text();
        const json = JSON.parse(text);
        if (json.detail && json.detail.message) return json.detail.message;
        if (json.detail && typeof json.detail === "string") return json.detail;
        if (json.error) return json.error;
        return `ElevenLabs API error (${res.status})`;
      } catch (e) {
        return `ElevenLabs request failed (${res.status})`;
      }
    }

    async fetchAccountVoices() {
      if (!this.apiKey) {
        throw new Error("Enter your ElevenLabs API key first to load your account voices.");
      }
      const res = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: { "xi-api-key": this.apiKey }
      });
      if (!res.ok) {
        throw new Error(await this.readErrorResponse(res));
      }
      const data = await res.json();
      return (data.voices || []).map((v) => ({
        id: v.voice_id,
        name: v.name,
        category: v.category || "library",
        accent: (v.labels && (v.labels.accent || v.labels.description)) || "Natural",
        description: (v.labels && (v.labels.use_case || v.labels.descriptive)) || "ElevenLabs neural voice"
      }));
    }

    playAudioSource(audioSrc, isObjectUrl, subtitle, sourceLabel, payload, myToken) {
      return new Promise((resolve) => {
        const audio = new Audio(audioSrc);
        audio.playbackRate = Math.min(1.35, Math.max(0.75, Number(this.settings.speed) || 1.0));
        this.currentAudio = audio;
        if (isObjectUrl) {
          this.currentObjectUrl = audioSrc;
        }

        const cleanup = () => {
          if (this.currentAudio === audio) {
            this.currentAudio = null;
          }
          if (isObjectUrl) {
            try {
              URL.revokeObjectURL(audioSrc);
            } catch (e) {}
            if (this.currentObjectUrl === audioSrc) {
              this.currentObjectUrl = null;
            }
          }
        };

        audio.addEventListener("ended", () => {
          cleanup();
          if (myToken === this.playbackToken) {
            this.setState({ status: "idle", subtitle, errorMessage: "" });
          }
          resolve(true);
        });

        audio.addEventListener("error", () => {
          cleanup();
          if (myToken === this.playbackToken) {
            this.setState({
              status: "error",
              subtitle,
              errorMessage: "Unable to play ElevenLabs MP3 audio clip."
            });
          }
          resolve(false);
        });

        this.setState({ status: "speaking", subtitle, sourceLabel, errorMessage: "" });
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch((err) => {
            cleanup();
            if (myToken !== this.playbackToken) {
              resolve(false);
              return;
            }
            if (err && err.name === "NotAllowedError") {
              this.pendingAutoplayPayload = payload;
              this.setState({
                status: "blocked_autoplay",
                subtitle,
                sourceLabel,
                errorMessage: "Tap anywhere or click Listen to start Nova's voice!"
              });
            } else {
              this.setState({
                status: "error",
                subtitle,
                errorMessage: err ? err.message : "Audio playback failed."
              });
            }
            resolve(false);
          });
        }
      });
    }
  }

  return {
    ELEVENLABS_VOICES,
    ELEVENLABS_MODELS,
    SpeechScriptBuilder,
    ElevenLabsVoiceEngine,
    fnv1aHex
  };
});
