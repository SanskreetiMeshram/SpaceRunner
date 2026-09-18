/**
 * Educational Edition - 2D Space Runner Game Engine
 * Implements full 10-level progression, curriculum quizzes, and Learn Mode.
 */

// Level Configurations (Classes 1 to 10)
const LEVEL_CONFIGS = [
  {
    level: 1, class: "Class 1", zone: "Playful Stardust Nebula", subjects: "Math (Counting & Shapes)",
    speed: 4.0, obsRate: 3.2, coinRate: 3.4, targetCoins: 5,
    colors: { primary: "#f472b6", secondary: "#4c1d95", bg: "#150826" }, emoji: "🪐"
  },
  {
    level: 2, class: "Class 2", zone: "Azure Crystal Belt", subjects: "Math (2-Digit Add/Sub & Tables)",
    speed: 4.4, obsRate: 2.9, coinRate: 3.2, targetCoins: 5,
    colors: { primary: "#38bdf8", secondary: "#1e3a8a", bg: "#081329" }, emoji: "💎"
  },
  {
    level: 3, class: "Class 3", zone: "Emerald Aurora Fields", subjects: "Math (Division & Fractions)",
    speed: 4.8, obsRate: 2.7, coinRate: 3.0, targetCoins: 5,
    colors: { primary: "#34d399", secondary: "#064e3b", bg: "#042018" }, emoji: "🌌"
  },
  {
    level: 4, class: "Class 4", zone: "Golden Solar Flare Way", subjects: "Math + Environmental Studies (EVS)",
    speed: 5.1, obsRate: 2.5, coinRate: 2.9, targetCoins: 6,
    colors: { primary: "#fbbf24", secondary: "#78350f", bg: "#261203" }, emoji: "☀️"
  },
  {
    level: 5, class: "Class 5", zone: "Deep Ocean Galaxy", subjects: "Math + Intro Science & Anatomy",
    speed: 5.5, obsRate: 2.3, coinRate: 2.8, targetCoins: 6,
    colors: { primary: "#60a5fa", secondary: "#172554", bg: "#060d21" }, emoji: "🌊"
  },
  {
    level: 6, class: "Class 6", zone: "Amethyst Pulsar Cluster", subjects: "Math (Integers) + Food & Motion",
    speed: 5.8, obsRate: 2.2, coinRate: 2.7, targetCoins: 6,
    colors: { primary: "#c084fc", secondary: "#3b0764", bg: "#1b042d" }, emoji: "🔮"
  },
  {
    level: 7, class: "Class 7", zone: "Plasma Storm Expanse", subjects: "Math + Physics + Chemistry + Biology",
    speed: 6.2, obsRate: 2.0, coinRate: 2.6, targetCoins: 7,
    colors: { primary: "#f87171", secondary: "#7f1d1d", bg: "#250606" }, emoji: "⚡"
  },
  {
    level: 8, class: "Class 8", zone: "Quantum Magnetic Rings", subjects: "Full Syllabus: Forces, Pressure, Cells",
    speed: 6.5, obsRate: 1.9, coinRate: 2.5, targetCoins: 7,
    colors: { primary: "#2dd4bf", secondary: "#134e4a", bg: "#051f1d" }, emoji: "🌀"
  },
  {
    level: 9, class: "Class 9", zone: "Supernova Deep Core", subjects: "Full Syllabus: Motion, Gravity, Atoms",
    speed: 6.8, obsRate: 1.8, coinRate: 2.4, targetCoins: 8,
    colors: { primary: "#fb923c", secondary: "#7c2d12", bg: "#2b0f06" }, emoji: "💥"
  },
  {
    level: 10, class: "Class 10", zone: "Master Academy Cosmos", subjects: "Board Syllabus: Optics, Electricity, Genetics",
    speed: 7.2, obsRate: 1.7, coinRate: 2.3, targetCoins: 8,
    colors: { primary: "#e11d48", secondary: "#4c0519", bg: "#21020a" }, emoji: "👑"
  }
];

// Audio Synthesizer (Web Audio API)
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  playTone(freq, type, duration, gainVal = 0.2) {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playCorrect() {
    // Sparkling arpeggio (C5 -> E5 -> G5 -> C6)
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      setTimeout(() => this.playTone(f, "sine", 0.35, 0.25), i * 90);
    });
  }

  playWrongSoft() {
    // Gentle curious two-tone (G4 -> E4)
    this.playTone(392.00, "triangle", 0.28, 0.22);
    setTimeout(() => this.playTone(329.63, "sine", 0.35, 0.2), 160);
  }

  playCoin() {
    this.playTone(987.77, "sine", 0.15, 0.2);
    setTimeout(() => this.playTone(1318.51, "sine", 0.22, 0.25), 80);
  }

  playDash() {
    this.playTone(140, "sawtooth", 0.25, 0.15);
  }

  playHit() {
    this.playTone(85, "square", 0.2, 0.25);
  }

  playStar() {
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      setTimeout(() => this.playTone(f, "triangle", 0.45, 0.3), i * 110);
    });
  }
}

// Main Game Controller
class Game {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.sound = new SoundSystem();

    // Game state
    this.state = "MAP"; // "MAP", "PLAYING", "QUESTION", "LEARN", "COMPLETE"
    this.currentLevel = 1;
    this.config = LEVEL_CONFIGS[0];
    this.score = 0;
    this.lives = 3;
    this.coins = 0;
    this.correctCount = 0;
    this.attemptCount = 0;

    // UFO Player
    this.player = {
      x: 120, y: 270, vx: 0, vy: 0,
      width: 54, height: 32,
      baseSpeed: 5.5,
      isDashing: false, dashTimer: 0, dashCooldown: 0,
      invulnerableTimer: 0
    };

    // World Entities
    this.obstacles = [];
    this.coinsInWorld = [];
    this.particles = [];
    this.stars = [];
    this.lastObsSpawn = 0;
    this.lastCoinSpawn = 0;

    // Question bank cache
    this.questionBanks = {};
    this.currentBank = null;
    this.questionQueue = [];
    this.activeQuestion = null;
    this.chosenOptionIndex = -1;

    // Persistence
    this.progress = this.loadProgress();

    // Input state
    this.keys = {};
    this.mouse = { isDown: false, x: 0, y: 0 };

    this.initStars();
    this.bindEvents();
    this.renderLevelMap();
    this.lastFrameTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  loadProgress() {
    const saved = localStorage.getItem("EducationalEdition_WebProgress");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      highestLevel: 1,
      stars: [0,0,0,0,0,0,0,0,0,0],
      highScores: [0,0,0,0,0,0,0,0,0,0],
      subjectStats: {} // e.g. { Math: { correct: 5, total: 6 } }
    };
  }

  saveProgress() {
    localStorage.setItem("EducationalEdition_WebProgress", JSON.stringify(this.progress));
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < 110; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2.2 + 0.6,
        speedFactor: Math.random() * 0.7 + 0.2,
        alpha: Math.random() * 0.8 + 0.2
      });
    }
  }

  bindEvents() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
      if (e.code === "ShiftLeft" || e.code === "ShiftRight" || e.code === "Space") {
        this.triggerDash();
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });

    this.canvas.addEventListener("mousedown", (e) => {
      this.mouse.isDown = true;
      this.updateMousePos(e);
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.mouse.isDown) this.updateMousePos(e);
    });

    window.addEventListener("mouseup", () => {
      this.mouse.isDown = false;
    });

    // Touch support for tablets/mobile
    this.canvas.addEventListener("touchstart", (e) => {
      this.mouse.isDown = true;
      if (e.touches.length > 0) this.updateMousePos(e.touches[0]);
    });
    this.canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) this.updateMousePos(e.touches[0]);
    });
    window.addEventListener("touchend", () => {
      this.mouse.isDown = false;
    });

    // UI Buttons
    document.getElementById("btn-sound-toggle").addEventListener("click", () => {
      this.sound.enabled = !this.sound.enabled;
      document.getElementById("btn-sound-toggle").textContent = this.sound.enabled ? "🔊" : "🔇";
    });

    document.getElementById("btn-map-nav").addEventListener("click", () => {
      this.showScreen("MAP");
    });

    document.getElementById("btn-hint").addEventListener("click", () => {
      const hintBox = document.getElementById("q-hint-box");
      hintBox.classList.toggle("hidden");
    });

    // Question Option Buttons
    document.querySelectorAll(".opt-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        this.submitAnswer(idx);
      });
    });

    // Learn Mode Buttons
    document.getElementById("btn-learn-retry").addEventListener("click", () => {
      this.showQuestionModal(this.activeQuestion);
    });

    document.getElementById("btn-learn-continue").addEventListener("click", () => {
      this.showScreen("PLAYING");
    });

    document.getElementById("btn-learn-map").addEventListener("click", () => {
      this.showScreen("MAP");
    });

    // Level Complete Buttons
    document.getElementById("btn-next-level").addEventListener("click", () => {
      if (this.currentLevel < 10) {
        this.startLevel(this.currentLevel + 1);
      } else {
        this.showScreen("MAP");
      }
    });

    document.getElementById("btn-replay-level").addEventListener("click", () => {
      this.startLevel(this.currentLevel);
    });

    document.getElementById("btn-complete-map").addEventListener("click", () => {
      this.showScreen("MAP");
    });

    // Skin modal
    document.getElementById("btn-custom-skin").addEventListener("click", () => {
      document.getElementById("skin-modal").classList.remove("hidden");
    });
    document.getElementById("btn-close-skin").addEventListener("click", () => {
      document.getElementById("skin-modal").classList.add("hidden");
    });
  }

  updateMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
    this.mouse.y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
  }

  triggerDash() {
    if (this.state !== "PLAYING") return;
    if (this.player.dashCooldown <= 0 && !this.player.isDashing) {
      this.player.isDashing = true;
      this.player.dashTimer = 0.35;
      this.player.dashCooldown = 1.6;
      this.sound.playDash();

      // Emit dash particles
      for (let i = 0; i < 15; i++) {
        this.particles.push({
          x: this.player.x - 10,
          y: this.player.y + (Math.random() * 20 - 10),
          vx: -(Math.random() * 6 + 4),
          vy: Math.random() * 3 - 1.5,
          color: "#00e5ff",
          size: Math.random() * 5 + 3,
          life: 0.3
        });
      }
    }
  }

  showScreen(target) {
    this.state = target;
    const hud = document.getElementById("hud-overlay");
    const map = document.getElementById("level-map-screen");
    const qModal = document.getElementById("question-modal");
    const lModal = document.getElementById("learn-mode-modal");
    const cModal = document.getElementById("level-complete-modal");

    hud.classList.add("hidden");
    map.classList.add("hidden");
    qModal.classList.add("hidden");
    lModal.classList.add("hidden");
    cModal.classList.add("hidden");

    if (target === "MAP") {
      map.classList.remove("hidden");
      this.renderLevelMap();
    } else if (target === "PLAYING") {
      hud.classList.remove("hidden");
    } else if (target === "QUESTION") {
      hud.classList.remove("hidden");
      qModal.classList.remove("hidden");
    } else if (target === "LEARN") {
      lModal.classList.remove("hidden");
    } else if (target === "COMPLETE") {
      cModal.classList.remove("hidden");
    }
  }

  renderLevelMap() {
    const container = document.getElementById("map-trail");
    container.innerHTML = "";

    let totalStars = 0;
    LEVEL_CONFIGS.forEach((lvl, idx) => {
      const isUnlocked = lvl.level <= this.progress.highestLevel;
      const starsEarned = this.progress.stars[idx] || 0;
      totalStars += starsEarned;

      const node = document.createElement("div");
      node.className = `map-node ${isUnlocked ? "" : "locked"}`;
      node.style.borderColor = isUnlocked ? lvl.colors.primary : "rgba(255,255,255,0.1)";

      let starsStr = "";
      for (let s = 0; s < 3; s++) {
        starsStr += (s < starsEarned) ? "⭐" : "▫️";
      }

      node.innerHTML = `
        <div class="node-planet-badge" style="background: ${lvl.colors.primary};">
          ${isUnlocked ? lvl.emoji : "🔒"}
        </div>
        <div class="node-class-name">${lvl.class}</div>
        <div class="node-subjects">${lvl.subjects}</div>
        <div class="node-stars">${isUnlocked ? starsStr : "Locked"}</div>
      `;

      if (isUnlocked) {
        node.addEventListener("click", () => this.startLevel(lvl.level));
      }

      container.appendChild(node);
    });

    document.getElementById("map-total-stars").textContent = `⭐ Stars Earned: ${totalStars} / 30`;
  }

  async startLevel(lvlNum) {
    this.currentLevel = lvlNum;
    this.config = LEVEL_CONFIGS[lvlNum - 1];

    this.score = 0;
    this.lives = 3;
    this.coins = 0;
    this.correctCount = 0;
    this.attemptCount = 0;

    this.player.x = 120;
    this.player.y = 270;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.isDashing = false;
    this.player.dashCooldown = 0;
    this.player.invulnerableTimer = 0;

    this.obstacles = [];
    this.coinsInWorld = [];
    this.particles = [];
    this.lastObsSpawn = performance.now();
    this.lastCoinSpawn = performance.now() + 1000;

    // Load question bank
    await this.loadQuestionBank(lvlNum);

    this.updateHUD();
    this.showScreen("PLAYING");
  }

  async loadQuestionBank(lvlNum) {
    if (!this.questionBanks[lvlNum]) {
      try {
        const res = await fetch(`QuestionBanks/level_${lvlNum}.json`);
        this.questionBanks[lvlNum] = await res.json();
      } catch (e) {
        console.warn(`Failed to fetch level_${lvlNum}.json, using fallback`);
        this.questionBanks[lvlNum] = {
          level: lvlNum,
          questions: [
            {
              id: "FB-001", subject: "Math", topic: "Basics", difficulty: "easy",
              questionText: "What is 5 + 3?",
              options: ["6", "7", "8", "9"], correctIndex: 2,
              solutionSteps: ["Start at 5.", "Add 3: 6, 7, 8.", "5 + 3 = 8."],
              hint: "Count 3 forward from 5."
            }
          ]
        };
      }
    }

    this.currentBank = this.questionBanks[lvlNum];
    // Shuffle questions
    this.questionQueue = [...this.currentBank.questions].sort(() => Math.random() - 0.5);
  }

  updateHUD() {
    document.getElementById("hud-level-badge").textContent = `${this.config.class} • ${this.config.zone}`;
    document.getElementById("hud-score-val").textContent = this.score;
    document.getElementById("hud-coins-val").textContent = `🪙 ${this.coins}`;

    // Lives
    const livesContainer = document.getElementById("hud-lives");
    livesContainer.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const span = document.createElement("span");
      span.className = "heart-icon";
      span.textContent = (i < this.lives) ? "❤️" : "🖤";
      livesContainer.appendChild(span);
    }

    // Progress Bar
    const pct = Math.min(100, Math.floor((this.coins / this.config.targetCoins) * 100));
    document.getElementById("hud-progress-fill").style.width = `${pct}%`;
    document.getElementById("hud-progress-text").textContent = `${this.coins} / ${this.config.targetCoins} Coins`;
  }

  handlePlayerInput(dt) {
    let moveX = 0, moveY = 0;

    if (this.keys["ArrowUp"] || this.keys["KeyW"]) moveY -= 1;
    if (this.keys["ArrowDown"] || this.keys["KeyS"]) moveY += 1;
    if (this.keys["ArrowLeft"] || this.keys["KeyA"]) moveX -= 1;
    if (this.keys["ArrowRight"] || this.keys["KeyD"]) moveX += 1;

    // Mouse / Touch drag
    if (this.mouse.isDown) {
      const dx = this.mouse.x - this.player.x;
      const dy = this.mouse.y - this.player.y;
      if (Math.hypot(dx, dy) > 15) {
        moveX = Math.sign(dx);
        moveY = Math.sign(dy);
      }
    }

    let speed = this.player.baseSpeed;
    if (this.player.isDashing) speed *= 2.4;

    this.player.x += moveX * speed;
    this.player.y += moveY * speed;

    // Screen bounds
    this.player.x = Math.max(30, Math.min(this.canvas.width - 60, this.player.x));
    this.player.y = Math.max(40, Math.min(this.canvas.height - 40, this.player.y));

    // Thruster engine particles
    if (Math.random() < 0.8) {
      this.particles.push({
        x: this.player.x - 22,
        y: this.player.y + (Math.random() * 8 - 4),
        vx: -(Math.random() * 4 + 2),
        vy: Math.random() * 1.5 - 0.75,
        color: this.player.isDashing ? "#00e5ff" : "#ff9900",
        size: Math.random() * 4 + 2,
        life: 0.25
      });
    }

    // Dash timers
    if (this.player.isDashing) {
      this.player.dashTimer -= dt;
      if (this.player.dashTimer <= 0) this.player.isDashing = false;
    }
    if (this.player.dashCooldown > 0) {
      this.player.dashCooldown -= dt;
    }

    // Update Dash Indicator
    const dashRatio = Math.max(0, 1 - (this.player.dashCooldown / 1.6));
    document.getElementById("hud-dash-fill").style.width = `${dashRatio * 100}%`;
    const label = document.querySelector(".dash-label");
    if (this.player.dashCooldown <= 0) {
      label.textContent = "SHIFT DASH [READY]";
      label.style.color = "#00e5ff";
    } else {
      label.textContent = "CHARGING...";
      label.style.color = "#8da4c4";
    }

    if (this.player.invulnerableTimer > 0) {
      this.player.invulnerableTimer -= dt;
    }
  }

  spawnEntities(now) {
    const ramp = this.coins * 0.05;
    const obsInterval = Math.max(1200, (this.config.obsRate - ramp) * 1000);
    const coinInterval = this.config.coinRate * 1000;

    // Spawn Obstacle
    if (now - this.lastObsSpawn > obsInterval) {
      this.lastObsSpawn = now;
      this.obstacles.push({
        x: this.canvas.width + 40,
        y: Math.random() * (this.canvas.height - 120) + 60,
        radius: Math.random() * 10 + 16,
        rot: 0,
        rotSpeed: Math.random() * 2 - 1,
        speed: (this.config.speed + ramp) * 0.95
      });
    }

    // Spawn Coin
    if (now - this.lastCoinSpawn > coinInterval) {
      this.lastCoinSpawn = now;
      this.coinsInWorld.push({
        x: this.canvas.width + 30,
        baseY: Math.random() * (this.canvas.height - 140) + 70,
        y: 0,
        radius: 18,
        life: 0,
        speed: this.config.speed
      });
    }
  }

  updateEntities(dt) {
    // Update Obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.x -= obs.speed * 60 * dt;
      obs.rot += obs.rotSpeed * dt;

      // Collision with player
      const dist = Math.hypot(this.player.x - obs.x, this.player.y - obs.y);
      if (dist < this.player.height / 2 + obs.radius && this.player.invulnerableTimer <= 0 && !this.player.isDashing) {
        this.playerHit();
      }

      if (obs.x < -60) this.obstacles.splice(i, 1);
    }

    // Update Coins
    for (let i = this.coinsInWorld.length - 1; i >= 0; i--) {
      const coin = this.coinsInWorld[i];
      coin.life += dt;
      coin.x -= coin.speed * 60 * dt;
      coin.y = coin.baseY + Math.sin(coin.life * 4) * 16;

      // Collision with player
      const dist = Math.hypot(this.player.x - coin.x, this.player.y - coin.y);
      if (dist < this.player.height / 2 + coin.radius) {
        this.coinsInWorld.splice(i, 1);
        this.collectCoin();
        break;
      }

      if (coin.x < -40) this.coinsInWorld.splice(i, 1);
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= dt;
      if (p.life <= 0) this.particles.splice(i, 1);
    }
  }

  playerHit() {
    this.lives--;
    this.player.invulnerableTimer = 1.6;
    this.sound.playHit();
    this.updateHUD();

    // Spark particles
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: this.player.x, y: this.player.y,
        vx: Math.random() * 6 - 3, vy: Math.random() * 6 - 3,
        color: "#ff2244", size: Math.random() * 4 + 2, life: 0.35
      });
    }

    if (this.lives <= 0) {
      alert("All lives used! Let's recharge and try this level again!");
      this.startLevel(this.currentLevel);
    }
  }

  collectCoin() {
    this.sound.playCoin();
    // Pause runner and present quiz question!
    if (this.questionQueue.length === 0 && this.currentBank) {
      this.questionQueue = [...this.currentBank.questions].sort(() => Math.random() - 0.5);
    }

    this.activeQuestion = this.questionQueue.shift();
    if (this.activeQuestion) {
      this.showQuestionModal(this.activeQuestion);
    }
  }

  showQuestionModal(q) {
    this.showScreen("QUESTION");

    const badge = document.getElementById("q-subject-badge");
    badge.textContent = `${this.getSubjectEmoji(q.subject)} ${q.subject.toUpperCase()}`;
    document.getElementById("q-topic-tag").textContent = `Topic: ${q.topic}`;
    document.getElementById("q-text").textContent = q.questionText;

    const hintBox = document.getElementById("q-hint-box");
    hintBox.textContent = q.hint || "Take your time and read carefully!";
    hintBox.classList.add("hidden");

    // Populate 4 buttons
    const buttons = document.querySelectorAll(".opt-btn");
    buttons.forEach((btn, i) => {
      btn.className = `opt-btn opt-${['a','b','c','d'][i]}`;
      btn.disabled = false;
      const letter = String.fromCharCode(65 + i);
      btn.textContent = `${letter}. ${q.options[i]}`;
    });

    document.getElementById("q-mascot-speech").textContent = "You can do it! Take your time and pick the best answer.";
  }

  getSubjectEmoji(sub) {
    switch (sub.toLowerCase()) {
      case "math": return "🧮";
      case "physics": return "⚡";
      case "chemistry": return "⚗️";
      case "biology": return "🔬";
      case "evs":
      case "science": return "🌿";
      default: return "⭐";
    }
  }

  submitAnswer(chosenIdx) {
    this.chosenOptionIndex = chosenIdx;
    this.attemptCount++;

    const isCorrect = (chosenIdx === this.activeQuestion.correctIndex);
    const buttons = document.querySelectorAll(".opt-btn");

    // Highlight button
    buttons.forEach((b) => (b.disabled = true));
    if (isCorrect) {
      buttons[chosenIdx].classList.add("correct-highlight");
      this.sound.playCorrect();
      document.getElementById("q-mascot-speech").textContent = "Super star! That's completely right! 🎉";
    } else {
      buttons[chosenIdx].classList.add("wrong-highlight");
      this.sound.playWrongSoft();
      document.getElementById("q-mascot-speech").textContent = "Oops! Let's learn how to solve this together!";
    }

    // Record subject metrics
    const sub = this.activeQuestion.subject;
    if (!this.progress.subjectStats[sub]) {
      this.progress.subjectStats[sub] = { correct: 0, total: 0 };
    }
    this.progress.subjectStats[sub].total++;
    if (isCorrect) this.progress.subjectStats[sub].correct++;
    this.saveProgress();

    setTimeout(() => {
      if (isCorrect) {
        this.correctCount++;
        this.score += 10;
        this.coins++;
        this.updateHUD();

        if (this.coins >= this.config.targetCoins) {
          this.completeLevel();
        } else {
          this.showScreen("PLAYING");
        }
      } else {
        // Open "Let's Learn!" screen
        this.showLearnModeModal(this.activeQuestion, chosenIdx);
      }
    }, 700);
  }

  showLearnModeModal(q, chosenIdx) {
    this.showScreen("LEARN");

    document.getElementById("learn-q-restated").textContent = `${this.getSubjectEmoji(q.subject)} ${q.questionText}`;
    document.getElementById("learn-chosen-ans").textContent = q.options[chosenIdx];
    document.getElementById("learn-correct-ans").textContent = q.options[q.correctIndex];

    const list = document.getElementById("learn-steps-list");
    list.innerHTML = "";

    const emoji = this.getSubjectEmoji(q.subject);
    q.solutionSteps.forEach((step, i) => {
      const item = document.createElement("div");
      item.className = "step-item";
      item.innerHTML = `<strong>${emoji} Step ${i + 1}:</strong> <span>${step}</span>`;
      list.appendChild(item);
    });
  }

  completeLevel() {
    this.sound.playStar();

    const accuracy = this.attemptCount > 0 ? (this.correctCount / this.attemptCount) : 1;
    let stars = 1;
    if (accuracy >= 0.99 && this.lives === 3) stars = 3;
    else if (accuracy >= 0.65) stars = 2;

    const idx = this.currentLevel - 1;
    if (stars > this.progress.stars[idx]) {
      this.progress.stars[idx] = stars;
    }
    if (this.score > this.progress.highScores[idx]) {
      this.progress.highScores[idx] = this.score;
    }
    if (this.currentLevel >= this.progress.highestLevel && this.currentLevel < 10) {
      this.progress.highestLevel = this.currentLevel + 1;
    }
    this.saveProgress();

    // Populate modal
    document.getElementById("complete-level-title").textContent = `${this.config.class} Cleared! 🎓`;
    document.getElementById("complete-subtitle").textContent = `Fantastic job mastering ${this.config.zone}!`;

    let starsStr = "";
    for (let s = 0; s < 3; s++) starsStr += (s < stars) ? "⭐" : "▫️";
    document.getElementById("complete-stars-row").textContent = starsStr;

    document.getElementById("complete-score-val").textContent = this.score;
    document.getElementById("complete-coins-val").textContent = this.coins;
    document.getElementById("complete-accuracy-val").textContent = `${Math.round(accuracy * 100)}%`;

    // Breakdown
    const metricsDiv = document.getElementById("complete-subject-metrics");
    metricsDiv.innerHTML = "";
    Object.keys(this.progress.subjectStats).forEach((s) => {
      const stat = this.progress.subjectStats[s];
      const pct = Math.round((stat.correct / stat.total) * 100);
      const row = document.createElement("div");
      row.textContent = `${this.getSubjectEmoji(s)} ${s}: ${pct}% (${stat.correct}/${stat.total} correct)`;
      metricsDiv.appendChild(row);
    });

    const nextBtn = document.getElementById("btn-next-level");
    nextBtn.style.display = (this.currentLevel < 10) ? "inline-block" : "none";

    this.showScreen("COMPLETE");
  }

  gameLoop(now) {
    const dt = Math.min(0.1, (now - this.lastFrameTime) / 1000);
    this.lastFrameTime = now;

    if (this.state === "PLAYING") {
      this.handlePlayerInput(dt);
      this.spawnEntities(now);
      this.updateEntities(dt);
    }

    this.render();
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Background Gradient based on level theme
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, this.config.colors.bg);
    grad.addColorStop(1, "#03040b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Parallax Stars
    const speed = (this.state === "PLAYING") ? this.config.speed : 1.2;
    this.stars.forEach((s) => {
      if (this.state === "PLAYING") {
        s.x -= s.speedFactor * speed * 0.8;
        if (s.x < 0) s.x = w;
      }
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Nebula Glow Clouds
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const radGrad = ctx.createRadialGradient(w * 0.7, h * 0.4, 20, w * 0.7, h * 0.4, 280);
    radGrad.addColorStop(0, `${this.config.colors.primary}33`);
    radGrad.addColorStop(1, "transparent");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // Render Particles
    this.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Render Obstacles (Asteroids)
    this.obstacles.forEach((obs) => {
      ctx.save();
      ctx.translate(obs.x, obs.y);
      ctx.rotate(obs.rot);

      // Asteroid body
      ctx.fillStyle = "#8a756b";
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 2; a += 0.6) {
        const r = obs.radius + Math.sin(a * 3) * 3;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#5a453d";
      ctx.stroke();

      // Crater
      ctx.fillStyle = "#4a352d";
      ctx.beginPath();
      ctx.arc(-obs.radius * 0.3, -obs.radius * 0.2, obs.radius * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Render Question Coins
    this.coinsInWorld.forEach((c) => {
      ctx.save();
      ctx.translate(c.x, c.y);

      // Outer golden glow
      const glowGrad = ctx.createRadialGradient(0, 0, 8, 0, 0, 26);
      glowGrad.addColorStop(0, "rgba(255, 220, 0, 0.8)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.fill();

      // Coin circle
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.arc(0, 0, c.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ff9900";
      ctx.stroke();

      // Inner '?' symbol
      ctx.fillStyle = "#b36b00";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("?", 0, 1);

      ctx.restore();
    });

    // Render Player UFO
    if (this.state === "PLAYING" || this.state === "QUESTION") {
      ctx.save();
      ctx.translate(this.player.x, this.player.y);

      // Blinking if invulnerable
      if (this.player.invulnerableTimer > 0 && Math.floor(performance.now() / 80) % 2 === 0) {
        ctx.globalAlpha = 0.3;
      }

      // UFO saucer hull
      ctx.fillStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.ellipse(0, 4, 27, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#94a3b8";
      ctx.stroke();

      // Cockpit dome
      const domeGrad = ctx.createRadialGradient(-3, -7, 2, 0, -4, 14);
      domeGrad.addColorStop(0, "#a5f3fc");
      domeGrad.addColorStop(1, "#0284c7");
      ctx.fillStyle = domeGrad;
      ctx.beginPath();
      ctx.arc(0, -2, 13, Math.PI, 0);
      ctx.closePath();
      ctx.fill();

      // Glowing rim lights
      ctx.fillStyle = "#ffcc00";
      [-16, -8, 0, 8, 16].forEach((offset) => {
        ctx.beginPath();
        ctx.arc(offset, 6, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }
  }
}

// Boot up game once DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  window.spaceGame = new Game();
});
