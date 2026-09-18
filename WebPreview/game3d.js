/**
 * Spaceship Runner - Advanced 3D Space Runner Engine
 * Built with Three.js WebGL, procedural 3D models, dynamic lighting, and curriculum quizzes.
 */

// 10 Level Grade Configurations (Class 1 to Class 10)
const LEVEL_CONFIGS_3D = [
  {
    level: 1, class: "Class 1", zone: "Playful Stardust Nebula", subjects: "Math (Counting & Shapes)",
    speed: 16.0, obsRate: 3.2, coinRate: 3.4, targetCoins: 5,
    fogColor: 0x14052b, starColor: 0xffa0e0, ufoColor: 0xfce7f3, planetColor: 0xf472b6,
    ambient: 0x6d28d9, sunColor: 0xffb7eb, emoji: "🪐"
  },
  {
    level: 2, class: "Class 2", zone: "Azure Crystal Belt", subjects: "Math (2-Digit Add/Sub & Tables)",
    speed: 18.0, obsRate: 2.9, coinRate: 3.2, targetCoins: 5,
    fogColor: 0x051329, starColor: 0x67e8f9, ufoColor: 0xe0f2fe, planetColor: 0x38bdf8,
    ambient: 0x0369a1, sunColor: 0x7dd3fc, emoji: "💎"
  },
  {
    level: 3, class: "Class 3", zone: "Emerald Aurora Fields", subjects: "Math (Division & Fractions)",
    speed: 20.0, obsRate: 2.7, coinRate: 3.0, targetCoins: 5,
    fogColor: 0x042018, starColor: 0x6ee7b7, ufoColor: 0xd1fae5, planetColor: 0x34d399,
    ambient: 0x047857, sunColor: 0xa7f3d0, emoji: "🌌"
  },
  {
    level: 4, class: "Class 4", zone: "Golden Solar Flare Way", subjects: "Math + Environmental Studies (EVS)",
    speed: 22.0, obsRate: 2.5, coinRate: 2.9, targetCoins: 6,
    fogColor: 0x241103, starColor: 0xfde68a, ufoColor: 0xfef3c7, planetColor: 0xfbbf24,
    ambient: 0xb45309, sunColor: 0xfef08a, emoji: "☀️"
  },
  {
    level: 5, class: "Class 5", zone: "Deep Ocean Galaxy", subjects: "Math + Intro Science & Anatomy",
    speed: 24.0, obsRate: 2.3, coinRate: 2.8, targetCoins: 6,
    fogColor: 0x050c24, starColor: 0x93c5fd, ufoColor: 0xdbeafe, planetColor: 0x60a5fa,
    ambient: 0x1d4ed8, sunColor: 0xbfdbfe, emoji: "🌊"
  },
  {
    level: 6, class: "Class 6", zone: "Amethyst Pulsar Cluster", subjects: "Math (Integers) + Food & Motion",
    speed: 26.0, obsRate: 2.2, coinRate: 2.7, targetCoins: 6,
    fogColor: 0x1b052c, starColor: 0xd8b4fe, ufoColor: 0xf3e8ff, planetColor: 0xc084fc,
    ambient: 0x7e22ce, sunColor: 0xe9d5ff, emoji: "🔮"
  },
  {
    level: 7, class: "Class 7", zone: "Plasma Storm Expanse", subjects: "Math + Physics + Chemistry + Biology",
    speed: 28.0, obsRate: 2.0, coinRate: 2.6, targetCoins: 7,
    fogColor: 0x26070a, starColor: 0xfca5a5, ufoColor: 0xffe4e6, planetColor: 0xf87171,
    ambient: 0xb91c1c, sunColor: 0xfecdd3, emoji: "⚡"
  },
  {
    level: 8, class: "Class 8", zone: "Quantum Magnetic Rings", subjects: "Full Syllabus: Forces, Pressure, Cells",
    speed: 30.0, obsRate: 1.9, coinRate: 2.5, targetCoins: 7,
    fogColor: 0x041c1c, starColor: 0x5eead4, ufoColor: 0xccfbf1, planetColor: 0x2dd4bf,
    ambient: 0x0f766e, sunColor: 0x99f6e4, emoji: "🌀"
  },
  {
    level: 9, class: "Class 9", zone: "Supernova Deep Core", subjects: "Full Syllabus: Motion, Gravity, Atoms",
    speed: 32.0, obsRate: 1.8, coinRate: 2.4, targetCoins: 8,
    fogColor: 0x260d04, starColor: 0xfdba74, ufoColor: 0xffedd5, planetColor: 0xfb923c,
    ambient: 0xc2410c, sunColor: 0xfed7aa, emoji: "💥"
  },
  {
    level: 10, class: "Class 10", zone: "Master Academy Cosmos", subjects: "Board Syllabus: Optics, Electricity, Genetics",
    speed: 34.0, obsRate: 1.7, coinRate: 2.3, targetCoins: 8,
    fogColor: 0x21020a, starColor: 0xfda4af, ufoColor: 0xffe4e6, planetColor: 0xe11d48,
    ambient: 0x9f1239, sunColor: 0xfecdd3, emoji: "👑"
  }
];

// Web Audio Sound Synthesizer
class Sound3D {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
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
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      setTimeout(() => this.playTone(f, "sine", 0.35, 0.25), i * 90);
    });
  }

  playWrongSoft() {
    this.playTone(392.00, "triangle", 0.28, 0.22);
    setTimeout(() => this.playTone(329.63, "sine", 0.35, 0.2), 160);
  }

  playCoin() {
    this.playTone(987.77, "sine", 0.15, 0.22);
    setTimeout(() => this.playTone(1318.51, "sine", 0.25, 0.28), 80);
  }

  playDash() {
    this.playTone(160, "sawtooth", 0.3, 0.2);
  }

  playHit() {
    this.playTone(85, "square", 0.25, 0.3);
  }

  playStar() {
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      setTimeout(() => this.playTone(f, "triangle", 0.45, 0.3), i * 110);
    });
  }
}

// ==========================================
// Procedural PBR Texture Generator
// ==========================================
class TextureGenerator3D {
  static init() {
    return {
      hull: this.createHullTexture(),
      asteroid: this.createAsteroidTexture(),
      asteroidOre: this.createAsteroidOreTexture(),
      coin: this.createCoinTexture(),
      glow: this.createGlowParticleTexture(),
      nebula: this.createNebulaCloudTexture(),
      panorama: this.createEquirectangularPanorama(),
      titaniumHeat: this.createTitaniumHeatTexture(),
      cockpitHUD: this.createCockpitHUDTexture(),
      sunFlare: this.createSunFlareTexture()
    };
  }

  static createHullTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Deep metallic base tone
    ctx.fillStyle = "#334155";
    ctx.fillRect(0, 0, 512, 512);

    // Armor panel seams
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3;
    for (let x = 0; x <= 512; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y <= 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Bevel highlights
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 1.5;
    for (let x = 2; x <= 512; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 2; y <= 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Rivet dots
    ctx.fillStyle = "#cbd5e1";
    for (let x = 16; x < 512; x += 32) {
      for (let y = 16; y < 512; y += 32) {
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    return tex;
  }

  static createAsteroidTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#44403c";
    ctx.fillRect(0, 0, 256, 256);

    // Speckle noise
    for (let i = 0; i < 1200; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "#57534e" : "#292524";
      ctx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 4 + 1, Math.random() * 4 + 1);
    }

    // Impact craters
    for (let j = 0; j < 16; j++) {
      const cx = Math.random() * 256;
      const cy = Math.random() * 256;
      const r = Math.random() * 16 + 6;

      const grad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
      grad.addColorStop(0, "#1c1917");
      grad.addColorStop(0.7, "#292524");
      grad.addColorStop(1, "#78716c");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Bright crater rim
      ctx.strokeStyle = "#a8a29e";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx - 1, cy - 1, r, Math.PI * 0.2, Math.PI * 1.1);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  static createCoinTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, "#fff59d");
    grad.addColorStop(0.4, "#ffd700");
    grad.addColorStop(0.8, "#f59e0b");
    grad.addColorStop(1, "#b45309");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Beveled concentric rings
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 4;
    [35, 65, 95, 118].forEach(r => {
      ctx.beginPath();
      ctx.arc(128, 128, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Star icon in center
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 96px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("★", 128, 130);

    return new THREE.CanvasTexture(canvas);
  }

  static createGlowParticleTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.25, "rgba(56, 189, 248, 0.95)");
    grad.addColorStop(0.65, "rgba(2, 132, 199, 0.35)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  static createNebulaCloudTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.85)");
    grad.addColorStop(0.3, "rgba(180, 210, 255, 0.35)");
    grad.addColorStop(0.7, "rgba(100, 140, 255, 0.12)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }

  static createEquirectangularPanorama() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Deep space dark void
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, 1024, 512);

    // Glowing cosmic nebulae bands (Milky Way style)
    const nebulae = [
      { x: 300, y: 220, r: 240, c1: "rgba(99, 102, 241, 0.45)", c2: "rgba(168, 85, 247, 0.25)" },
      { x: 750, y: 280, r: 280, c1: "rgba(14, 165, 233, 0.4)", c2: "rgba(56, 189, 248, 0.2)" },
      { x: 500, y: 180, r: 200, c1: "rgba(244, 63, 94, 0.35)", c2: "rgba(251, 146, 60, 0.15)" },
      { x: 150, y: 380, r: 180, c1: "rgba(16, 185, 129, 0.3)", c2: "rgba(5, 150, 105, 0.1)" }
    ];

    nebulae.forEach(n => {
      const grad = ctx.createRadialGradient(n.x, n.y, 10, n.x, n.y, n.r);
      grad.addColorStop(0, n.c1);
      grad.addColorStop(0.5, n.c2);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Dark interstellar dust absorption filaments
    ctx.strokeStyle = "rgba(2, 6, 23, 0.65)";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(100, 260);
    ctx.bezierCurveTo(350, 220, 600, 300, 950, 240);
    ctx.stroke();

    // Thousands of multi-spectral stars
    for (let i = 0; i < 2200; i++) {
      const sx = Math.random() * 1024;
      const sy = Math.random() * 512;
      const sz = Math.random() * 1.8 + 0.4;
      const pick = Math.random();
      const col = pick < 0.6 ? "#ffffff" : (pick < 0.8 ? "#93c5fd" : (pick < 0.95 ? "#fed7aa" : "#fda4af"));
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(sx, sy, sz, 0, Math.PI * 2);
      ctx.fill();
    }

    // Stellar Sun Core with intense white glint
    const sunGrad = ctx.createRadialGradient(420, 180, 2, 420, 180, 70);
    sunGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    sunGrad.addColorStop(0.3, "rgba(254, 240, 138, 0.8)");
    sunGrad.addColorStop(0.7, "rgba(251, 146, 60, 0.3)");
    sunGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(420, 180, 70, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    return tex;
  }

  static createTitaniumHeatTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    // Extreme supersonic exhaust thermal oxidation gradient
    const grad = ctx.createLinearGradient(0, 0, 256, 0);
    grad.addColorStop(0, "#334155");    // Cold gunmetal titanium
    grad.addColorStop(0.35, "#eab308"); // Straw golden oxide
    grad.addColorStop(0.55, "#a855f7"); // Purple transition
    grad.addColorStop(0.75, "#2563eb"); // Intense cobalt blue
    grad.addColorStop(0.92, "#06b6d4"); // Cyan high-heat zone
    grad.addColorStop(1.0, "#f8fafc");  // Glowing white-hot inner nozzle lip

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 64);

    return new THREE.CanvasTexture(canvas);
  }

  static createAsteroidOreTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    // Dark matte basalt background (low metal, high roughness)
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, 256, 256);

    // Nickel-iron & quartz mineral ore veins (high specular glint)
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 256, Math.random() * 256);
      ctx.bezierCurveTo(
        Math.random() * 256, Math.random() * 256,
        Math.random() * 256, Math.random() * 256,
        Math.random() * 256, Math.random() * 256
      );
      ctx.stroke();
    }

    // Ore crystal clusters
    for (let j = 0; j < 35; j++) {
      ctx.fillStyle = Math.random() > 0.4 ? "#f1f5f9" : "#cbd5e1";
      ctx.beginPath();
      ctx.arc(Math.random() * 256, Math.random() * 256, Math.random() * 5 + 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  static createCockpitHUDTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 256, 256);

    // Glowing cyan HUD Artificial Horizon & Pitch Ladder
    ctx.strokeStyle = "#00f5ff";
    ctx.shadowColor = "#00f5ff";
    ctx.shadowBlur = 8;
    ctx.lineWidth = 3;

    // Center targeting reticle
    ctx.beginPath();
    ctx.arc(128, 128, 36, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(128, 128, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#00f5ff";
    ctx.fill();

    // Horizon wings
    ctx.beginPath();
    ctx.moveTo(40, 128); ctx.lineTo(84, 128);
    ctx.moveTo(172, 128); ctx.lineTo(216, 128);
    ctx.stroke();

    // Pitch ladder bars
    [-40, 40].forEach(dy => {
      ctx.beginPath();
      ctx.moveTo(96, 128 + dy); ctx.lineTo(160, 128 + dy);
      ctx.stroke();
    });

    // Telemetry text
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 16px monospace";
    ctx.fillText("SPD 1.35M", 50, 60);
    ctx.fillText("LOCK: AUTO", 50, 210);

    return new THREE.CanvasTexture(canvas);
  }

  static createSunFlareTexture() {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    // Central circular glow
    const grad = ctx.createRadialGradient(128, 128, 4, 128, 128, 120);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.18, "rgba(254, 240, 138, 0.85)");
    grad.addColorStop(0.5, "rgba(56, 189, 248, 0.35)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);
    ctx.fill();

    // Anamorphic 4-point diamond diffraction spikes
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.fillRect(0, 126, 256, 4);
    ctx.fillRect(126, 0, 4, 256);

    return new THREE.CanvasTexture(canvas);
  }
}

// ==========================================
// Real-Time 3D Particle FX System
// ==========================================
class ParticleFX3D {
  constructor(scene, glowTexture) {
    this.scene = scene;
    this.glowTexture = glowTexture;
    this.particles = [];
    this.rings = [];
  }

  spawnEngineSparks(x, y, z, isDashing) {
    const count = isDashing ? 3 : 1;
    for (let i = 0; i < count; i++) {
      const geo = new THREE.PlaneGeometry(0.55, 0.55);
      const mat = new THREE.MeshBasicMaterial({
        map: this.glowTexture,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: isDashing ? 0xffffff : 0x38bdf8
      });
      const spark = new THREE.Mesh(geo, mat);
      spark.position.set(
        x + (Math.random() - 0.5) * 0.4,
        y + (Math.random() - 0.5) * 0.4,
        z + (Math.random() - 0.5) * 0.3
      );
      this.scene.add(spark);
      this.particles.push({
        mesh: spark,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        vz: 14.0 + Math.random() * 8.0,
        life: 0,
        maxLife: 0.42
      });
    }
  }

  spawnCoinExplosion(x, y, z) {
    // 24 glowing gold star particles
    for (let i = 0; i < 24; i++) {
      const geo = new THREE.PlaneGeometry(0.85, 0.85);
      const mat = new THREE.MeshBasicMaterial({
        map: this.glowTexture,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xffea00
      });
      const p = new THREE.Mesh(geo, mat);
      p.position.set(x, y, z);
      this.scene.add(p);

      const angle = (i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 14 + 6;
      this.particles.push({
        mesh: p,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        vz: (Math.random() - 0.5) * 10,
        life: 0,
        maxLife: 0.65
      });
    }

    // Expanding shockwave ring
    const ringGeo = new THREE.RingGeometry(0.6, 0.9, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffea00,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(x, y, z);
    this.scene.add(ring);
    this.rings.push({
      mesh: ring,
      life: 0,
      maxLife: 0.48
    });
  }

  spawnImpactRubble(x, y, z) {
    for (let i = 0; i < 16; i++) {
      const geo = new THREE.DodecahedronGeometry(0.32, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x85756c,
        roughness: 0.9
      });
      const chunk = new THREE.Mesh(geo, mat);
      chunk.position.set(x, y, z);
      this.scene.add(chunk);

      this.particles.push({
        mesh: chunk,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18,
        vz: (Math.random() - 0.5) * 18,
        rotX: Math.random() * 8,
        rotY: Math.random() * 8,
        life: 0,
        maxLife: 0.75
      });
    }
  }

  update(dt, camera) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += dt;
      if (p.life >= p.maxLife) {
        this.scene.remove(p.mesh);
        this.particles.splice(i, 1);
        continue;
      }
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;

      if (p.rotX) p.mesh.rotation.x += p.rotX * dt;
      if (p.rotY) p.mesh.rotation.y += p.rotY * dt;

      if (camera && p.mesh.geometry.type === "PlaneGeometry") {
        p.mesh.quaternion.copy(camera.quaternion);
      }

      const progress = p.life / p.maxLife;
      p.mesh.material.opacity = (1 - progress) * (1 - progress);
      const s = 1.0 - progress * 0.4;
      p.mesh.scale.set(s, s, s);
    }

    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.life += dt;
      if (r.life >= r.maxLife) {
        this.scene.remove(r.mesh);
        this.rings.splice(i, 1);
        continue;
      }
      const progress = r.life / r.maxLife;
      const scale = 1.0 + progress * 8.5;
      r.mesh.scale.set(scale, scale, scale);
      r.mesh.material.opacity = (1 - progress) * 0.9;
      if (camera) r.mesh.quaternion.copy(camera.quaternion);
    }
  }
}

// 3D Game Engine
class SpaceGame3D {
  constructor() {
    this.container = document.getElementById("viewport-wrapper");
    this.sound = new Sound3D();

    this.state = "MAP";
    this.currentLevel = 1;
    this.config = LEVEL_CONFIGS_3D[0];
    this.score = 0;
    this.lives = 3;
    this.coins = 0;
    this.correctCount = 0;
    this.attemptCount = 0;

    // Procedural PBR Textures
    this.textures = TextureGenerator3D.init();

    // Flight boundary limits in 3D
    this.bounds = { minX: -16, maxX: 16, minY: -8, maxY: 10 };

    // Player 3D flight state
    this.player = {
      x: 0, y: 0, z: 0,
      vx: 0, vy: 0,
      targetX: 0, targetY: 0,
      roll: 0, pitch: 0, yaw: 0,
      isDashing: false, dashTimer: 0, dashCooldown: 0,
      invulnerableTimer: 0,
      mesh: null, engineLight: null
    };

    // Universal Mobile & Laptop Input State
    this.isTouchDevice = (typeof window !== 'undefined') && ('ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0));
    this.touchActive = false;
    this.joystick = { vx: 0, vy: 0 };
    this.keys = {};
    this.mouse = { isDown: false, x: 0, y: 0 };

    // 3D world arrays
    this.obstacles = [];
    this.coinsInWorld = [];
    this.exhaustParticles = [];
    this.navLights = [];
    this.lastObsSpawn = 0;
    this.lastCoinSpawn = 0;

    // Questions
    this.questionBanks = {};
    this.currentBank = null;
    this.questionQueue = [];
    this.activeQuestion = null;

    // Save data
    this.progress = this.loadProgress();

    this.initThree();
    this.build3DScene();
    this.particleFX = new ParticleFX3D(this.scene, this.textures.glow);
    this.bindEvents();
    this.renderLevelMap();

    this.lastFrameTime = performance.now();
    requestAnimationFrame((t) => this.animate(t));
  }

  loadProgress() {
    const saved = localStorage.getItem("EducationalEdition_3DProgress");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        // Ensure all 10 grades are unlocked for direct grade selection
        p.highestLevel = 10;
        return p;
      } catch (e) {}
    }
    return {
      highestLevel: 10,
      stars: [0,0,0,0,0,0,0,0,0,0],
      highScores: [0,0,0,0,0,0,0,0,0,0],
      subjectStats: {}
    };
  }

  saveProgress() {
    localStorage.setItem("EducationalEdition_3DProgress", JSON.stringify(this.progress));
  }

  initThree() {
    // 1. Scene with exponential cosmic depth fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(this.config.fogColor, 0.0035);

    // 2. Camera (Third-person chase camera)
    const rect = this.container.getBoundingClientRect();
    const width = Math.floor(rect.width) || 960;
    const height = Math.floor(rect.height) || 540;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 4.5, 14);
    this.camera.lookAt(0, 1.5, -30);

    // 3. WebGL Renderer with Soft Shadow Maps & HDR ACES Filmic Tone Mapping
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Image-Based Lighting (IBL) environment reflection map via PMREM
    if (this.textures.panorama && THREE.PMREMGenerator) {
      try {
        const pmrem = new THREE.PMREMGenerator(this.renderer);
        pmrem.compileEquirectangularShader();
        const envRenderTarget = pmrem.fromEquirectangular(this.textures.panorama);
        this.scene.environment = envRenderTarget.texture;
        pmrem.dispose();
      } catch (e) {
        console.warn("IBL PMREM generation fallback:", e);
      }
    }

    // Insert canvas as first child of viewport
    this.container.insertBefore(this.renderer.domElement, this.container.firstChild);

    // Dynamic auto-responsive resizing for Laptop & Mobile
    this.onResize = () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const r = this.container.getBoundingClientRect();
      const w = Math.floor(r.width) || 960;
      const h = Math.floor(r.height) || 540;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    window.addEventListener("resize", this.onResize);
    setTimeout(this.onResize, 80);
  }

  build3DScene() {
    // 1. Lighting: Soft Shadows & Realistic Space Contrast
    this.ambientLight = new THREE.AmbientLight(this.config.ambient, 0.95);
    this.scene.add(this.ambientLight);

    // Primary Sunlight casting soft shadows
    this.sunLight = new THREE.DirectionalLight(this.config.sunColor, 2.4);
    this.sunLight.position.set(25, 45, 25);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.sunLight.shadow.camera.near = 5;
    this.sunLight.shadow.camera.far = 140;
    this.sunLight.shadow.camera.left = -22;
    this.sunLight.shadow.camera.right = 22;
    this.sunLight.shadow.camera.top = 22;
    this.sunLight.shadow.camera.bottom = -22;
    this.sunLight.shadow.bias = -0.0008;
    this.scene.add(this.sunLight);

    // Cinematic Kicker/Rim Light from deep space shadow side
    this.rimLight = new THREE.DirectionalLight(0x6366f1, 1.1);
    this.rimLight.position.set(-30, -15, -40);
    this.scene.add(this.rimLight);

    // 2. Radiant Cosmic Sun with Solar Corona & Anamorphic Flare
    this.buildSunCorona();

    // 3. Volumetric Cosmic Nebulae
    this.buildVolumetricNebulae();

    // 4. Multi-Tier Dynamic Starfield
    this.buildWarpStarfield();

    // 5. Distant Celestial Planet with Atmosphere & Saturn Rings
    this.buildCelestialPlanet();

    // 6. Lowpoly Spaceship Fighter Model
    this.buildSpaceshipFighterModel();
  }

  buildSunCorona() {
    const sunGroup = new THREE.Group();

    // Intense central solar flare billboard
    const flareGeo = new THREE.PlaneGeometry(85, 85);
    const flareMat = new THREE.MeshBasicMaterial({
      map: this.textures.sunFlare,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.sunCorona = new THREE.Mesh(flareGeo, flareMat);
    sunGroup.add(this.sunCorona);

    // Glowing solar sphere
    const sunSphereGeo = new THREE.SphereGeometry(14, 24, 24);
    const sunSphereMat = new THREE.MeshBasicMaterial({
      color: 0xfffbeb,
      transparent: true,
      opacity: 0.95
    });
    const sunSphere = new THREE.Mesh(sunSphereGeo, sunSphereMat);
    sunGroup.add(sunSphere);

    sunGroup.position.set(65, 105, -280);
    this.scene.add(sunGroup);
    this.sunCoronaGroup = sunGroup;
  }

  buildVolumetricNebulae() {
    this.nebulaGroup = new THREE.Group();
    const cloudGeo = new THREE.PlaneGeometry(120, 120);

    for (let i = 0; i < 10; i++) {
      const cloudMat = new THREE.MeshBasicMaterial({
        map: this.textures.nebula,
        transparent: true,
        opacity: 0.18 + Math.random() * 0.12,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: this.config.ambient
      });
      const cloud = new THREE.Mesh(cloudGeo, cloudMat);
      cloud.position.set(
        (Math.random() - 0.5) * 160,
        (Math.random() - 0.5) * 80 + 10,
        -140 - Math.random() * 200
      );
      cloud.rotation.z = Math.random() * Math.PI * 2;
      cloud.scale.setScalar(0.8 + Math.random() * 0.6);
      this.nebulaGroup.add(cloud);
    }
    this.scene.add(this.nebulaGroup);
  }

  buildCelestialPlanet() {
    const planetGroup = new THREE.Group();

    // Main Planet Sphere
    const planetGeo = new THREE.SphereGeometry(35, 32, 32);
    const planetMat = new THREE.MeshStandardMaterial({
      color: this.config.planetColor,
      roughness: 0.75,
      metalness: 0.25
    });
    this.distantPlanet = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(this.distantPlanet);

    // Atmospheric Rim Glow Shell
    const atmoGeo = new THREE.SphereGeometry(36.8, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: this.config.sunColor,
      transparent: true,
      opacity: 0.28,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmo = new THREE.Mesh(atmoGeo, atmoMat);
    planetGroup.add(atmo);

    // Multi-band Saturn-like rings with Cassini division gap
    const innerRingGeo = new THREE.RingGeometry(42, 54, 48);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: this.config.planetColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI * 0.38;
    planetGroup.add(innerRing);

    const outerRingGeo = new THREE.RingGeometry(57, 68, 48);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI * 0.38;
    planetGroup.add(outerRing);

    planetGroup.position.set(85, 28, -280);
    this.scene.add(planetGroup);
    this.planetGroup = planetGroup;
  }

  buildSpaceshipFighterModel() {
    const shipGroup = new THREE.Group();

    // PBR Materials with procedural bump maps & shadows
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x489b88, // Military teal/mint camo armor
      metalness: 0.7,
      roughness: 0.32,
      bumpMap: this.textures.hull,
      bumpScale: 0.05
    });
    const darkArmorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Dark charcoal hull panels & underbelly
      metalness: 0.85,
      roughness: 0.25,
      bumpMap: this.textures.hull,
      bumpScale: 0.04
    });
    const whiteStripeMat = new THREE.MeshStandardMaterial({
      color: 0xecfdf5, // White decal stripes
      metalness: 0.4,
      roughness: 0.4
    });
    const canopyMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a, // Smoked glass cockpit canopy
      metalness: 0.85,
      roughness: 0.1,
      transmission: 0.7,
      reflectivity: 0.95
    });
    const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
    const redGlowMat = new THREE.MeshBasicMaterial({ color: 0xff1e56 });
    const greenGlowMat = new THREE.MeshBasicMaterial({ color: 0x00e676 });
    const magentaGlowMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
    const plasmaFlameMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    // 1. Central Fuselage
    const fuseGeo = new THREE.CylinderGeometry(0.35, 1.45, 8.8, 6);
    fuseGeo.rotateX(Math.PI / 2);
    const fuselage = new THREE.Mesh(fuseGeo, hullMat);
    fuselage.scale.set(1.5, 0.72, 1.0);
    fuselage.castShadow = true;
    fuselage.receiveShadow = true;
    shipGroup.add(fuselage);

    // 2. Cockpit Canopy & Holographic Flight HUD
    const canopyGeo = new THREE.CylinderGeometry(0.18, 0.68, 5.0, 5);
    canopyGeo.rotateX(Math.PI / 2);
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(0, 0.48, -0.6);
    canopy.scale.set(1.1, 0.62, 1.0);
    canopy.castShadow = true;
    shipGroup.add(canopy);

    // Glowing Cockpit Instrumentation Light
    const cockpitGlow = new THREE.PointLight(0x00f5ff, 1.4, 4.0);
    cockpitGlow.position.set(0, 0.45, -0.6);
    shipGroup.add(cockpitGlow);

    // 3D Holographic Cockpit Flight HUD Reticle
    const hudGeo = new THREE.PlaneGeometry(0.68, 0.68);
    const hudMat = new THREE.MeshBasicMaterial({
      map: this.textures.cockpitHUD,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    this.cockpitHUD = new THREE.Mesh(hudGeo, hudMat);
    this.cockpitHUD.position.set(0, 0.48, -1.2);
    this.cockpitHUD.rotation.x = -0.15;
    shipGroup.add(this.cockpitHUD);

    // 3. Side Armor Strakes
    const strakeGeo = new THREE.BufferGeometry();
    const strakeVerts = new Float32Array([
      0, 0, -4.4,  -2.4, -0.08, 0.8,  0, 0, 1.2,
      0, 0, -4.4,  0, 0, 1.2,          2.4, -0.08, 0.8
    ]);
    strakeGeo.setAttribute('position', new THREE.BufferAttribute(strakeVerts, 3));
    strakeGeo.computeVertexNormals();
    const strakes = new THREE.Mesh(strakeGeo, darkArmorMat);
    strakes.castShadow = true;
    strakes.receiveShadow = true;
    shipGroup.add(strakes);

    // 4. Decal Camo Stripes
    const stripeGeo = new THREE.BoxGeometry(0.48, 0.06, 3.2);
    stripeGeo.rotateZ(0.2);
    const leftStripe = new THREE.Mesh(stripeGeo, whiteStripeMat);
    leftStripe.position.set(-0.88, 0.26, 0.2);
    shipGroup.add(leftStripe);

    const rightStripe = new THREE.Mesh(stripeGeo, whiteStripeMat);
    rightStripe.position.set(0.88, 0.26, 0.2);
    rightStripe.rotation.z = -0.4;
    shipGroup.add(rightStripe);

    // 5. Nose Optical Sensors
    const magSensor = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), magentaGlowMat);
    magSensor.position.set(0, 0.16, -3.3);
    shipGroup.add(magSensor);

    const cyanSensorL = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), cyanGlowMat);
    cyanSensorL.position.set(-0.28, 0.22, -2.2);
    shipGroup.add(cyanSensorL);

    const cyanSensorR = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), cyanGlowMat);
    cyanSensorR.position.set(0.28, 0.22, -2.2);
    shipGroup.add(cyanSensorR);

    // 6. Left & Right Wing Pylons & Heavy Outboard Nacelles
    this.thrusterFlames = [];
    this.machDiamonds = [];
    this.navLights = [];

    const whiteCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });

    const diamondMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending
    });

    const nozzleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: this.textures.titaniumHeat,
      metalness: 0.92,
      roughness: 0.22,
      bumpMap: this.textures.hull,
      bumpScale: 0.04
    });

    [-1, 1].forEach((side) => {
      // Horizontal wing truss
      const wingGeo = new THREE.BoxGeometry(3.6, 0.24, 1.8);
      const wing = new THREE.Mesh(wingGeo, hullMat);
      wing.position.set(side * 2.8, -0.08, 1.0);
      wing.rotation.y = side * 0.14;
      wing.castShadow = true;
      wing.receiveShadow = true;
      shipGroup.add(wing);

      // Decal stripe on wing
      const wStripe = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.26, 0.45), whiteStripeMat);
      wStripe.position.set(side * 2.8, -0.06, 1.0);
      shipGroup.add(wStripe);

      // Nacelle Turbine Cylinder
      const nacelleGeo = new THREE.CylinderGeometry(1.05, 0.95, 5.4, 24);
      nacelleGeo.rotateX(Math.PI / 2);
      const nacelle = new THREE.Mesh(nacelleGeo, hullMat);
      nacelle.position.set(side * 4.6, 0.2, 0.8);
      nacelle.castShadow = true;
      nacelle.receiveShadow = true;
      shipGroup.add(nacelle);

      // Front Air-Intake Cowling
      const intakeGeo = new THREE.TorusGeometry(0.96, 0.16, 12, 24);
      const intake = new THREE.Mesh(intakeGeo, darkArmorMat);
      intake.position.set(side * 4.6, 0.2, -1.9);
      shipGroup.add(intake);

      const vent = new THREE.Mesh(new THREE.CircleGeometry(0.92, 18), darkArmorMat);
      vent.position.set(side * 4.6, 0.2, -1.85);
      shipGroup.add(vent);

      // Vertical Stabilizer Fin
      const finShape = new THREE.Shape();
      finShape.moveTo(-1.3, 0);
      finShape.lineTo(0.7, 0);
      finShape.lineTo(0.15, 1.65);
      finShape.lineTo(-0.85, 1.65);
      finShape.closePath();

      const finExtrude = new THREE.ExtrudeGeometry(finShape, { depth: 0.16, bevelEnabled: false });
      finExtrude.rotateY(Math.PI / 2);
      const fin = new THREE.Mesh(finExtrude, hullMat);
      fin.position.set(side * 4.6, 0.9, 0.8);
      fin.castShadow = true;
      shipGroup.add(fin);

      // Aviation Navigation Beacons
      const navMat = side < 0 ? redGlowMat : greenGlowMat;
      const wingtipNav = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), navMat);
      wingtipNav.position.set(side * 4.8, 0.15, 1.0);
      shipGroup.add(wingtipNav);
      this.navLights.push(wingtipNav);

      // Cyan Fin Strobe Beacon
      const strobe = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 1.15), cyanGlowMat);
      strobe.position.set(side * 4.6, 2.52, 0.6);
      shipGroup.add(strobe);
      this.navLights.push(strobe);

      // Heat-Anodized Rainbow Titanium Exhaust Nozzle
      const exhaustRing = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.16, 16, 32), nozzleMat);
      exhaustRing.position.set(side * 4.6, 0.2, 3.5);
      shipGroup.add(exhaustRing);

      // Supersonic Outer Plasma Flame Exhaust Cone
      const flameGeo = new THREE.ConeGeometry(0.74, 3.0, 16);
      flameGeo.rotateX(-Math.PI / 2);
      const flame = new THREE.Mesh(flameGeo, plasmaFlameMat);
      flame.position.set(side * 4.6, 0.2, 4.8);
      shipGroup.add(flame);
      this.thrusterFlames.push(flame);

      // Supersonic White-Hot Inner Core Flame Cone
      const coreGeo = new THREE.ConeGeometry(0.38, 2.2, 16);
      coreGeo.rotateX(-Math.PI / 2);
      const core = new THREE.Mesh(coreGeo, whiteCoreMat);
      core.position.set(side * 4.6, 0.2, 4.3);
      shipGroup.add(core);

      // 3 Supersonic Mach Shock Diamonds (standing shockwave discs)
      [3.9, 4.5, 5.1].forEach((zPos, dIdx) => {
        const dRadius = 0.35 - dIdx * 0.08;
        const dGeo = new THREE.CylinderGeometry(dRadius, dRadius, 0.08, 16);
        dGeo.rotateX(Math.PI / 2);
        const diamond = new THREE.Mesh(dGeo, diamondMat);
        diamond.position.set(side * 4.6, 0.2, zPos);
        shipGroup.add(diamond);
        this.machDiamonds.push({ mesh: diamond, baseZ: zPos, idx: dIdx });
      });
    });

    // Dynamic Dual Thruster Light
    this.enginePointLight = new THREE.PointLight(0x00f5ff, 3.5, 20);
    this.enginePointLight.position.set(0, 0.2, 4.2);
    shipGroup.add(this.enginePointLight);

    // Holographic Protective Energy Shield
    const shieldGeo = new THREE.SphereGeometry(6.4, 24, 20);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x00c8ff,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.0,
      roughness: 0.1,
      metalness: 0.9
    });
    this.shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    this.shieldMesh.visible = false;
    shipGroup.add(this.shieldMesh);

    shipGroup.position.set(0, 0, 0);
    shipGroup.scale.set(0.78, 0.78, 0.78);
    this.scene.add(shipGroup);
    this.player.mesh = shipGroup;
  }

  buildWarpStarfield() {
    const starCount = 3200;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const baseColor = new THREE.Color(this.config.starColor);
    const blueStar = new THREE.Color(0x93c5fd);
    const amberStar = new THREE.Color(0xfde047);
    const whiteStar = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 180;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 130;
      positions[i * 3 + 2] = -Math.random() * 460;

      const pick = Math.random();
      const col = pick < 0.5 ? baseColor : (pick < 0.75 ? whiteStar : (pick < 0.9 ? blueStar : amberStar));
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.95
    });

    this.starPoints = new THREE.Points(starGeo, starMat);
    this.scene.add(this.starPoints);
  }

  updateWarpStarfield(dt, speedMultiplier) {
    if (!this.starPoints) return;
    const positions = this.starPoints.geometry.attributes.position.array;
    const speed = this.config.speed * speedMultiplier * dt * 4.5;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] += speed;
      if (positions[i + 2] > 20) {
        positions[i + 2] = -450;
        positions[i] = (Math.random() - 0.5) * 180;
        positions[i + 1] = (Math.random() - 0.5) * 130;
      }
    }
    this.starPoints.geometry.attributes.position.needsUpdate = true;
  }

  bindEvents() {
    // Keyboard inputs
    window.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
      if (e.code === "ShiftLeft" || e.code === "ShiftRight" || e.code === "Space") {
        this.triggerDash();
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });

    // Device Auto-Understanding: detect touch vs mouse/keyboard
    const checkTouch = () => {
      if (!this.touchActive) {
        this.touchActive = true;
        const mobileControls = document.getElementById("mobile-controls");
        if (mobileControls) mobileControls.classList.remove("hidden");
        const hint = document.getElementById("hud-controls-hint");
        if (hint) {
          hint.innerHTML = "<span>🕹️ Drag Stick to Steer</span> • <span>⚡ Tap DASH</span> • <span>Collect 🪙 Coins!</span>";
        }
      }
    };
    window.addEventListener("touchstart", checkTouch, { passive: true });

    // Mouse / Touch direct canvas flight control
    const canvasEl = this.renderer.domElement;
    canvasEl.addEventListener("mousedown", (e) => {
      this.mouse.isDown = true;
      this.updateMouseCoords(e);
    });
    canvasEl.addEventListener("mousemove", (e) => {
      if (this.mouse.isDown) this.updateMouseCoords(e);
    });
    window.addEventListener("mouseup", () => { this.mouse.isDown = false; });

    canvasEl.addEventListener("touchstart", (e) => {
      checkTouch();
      this.mouse.isDown = true;
      if (e.touches.length > 0) this.updateMouseCoords(e.touches[0]);
    }, { passive: true });
    canvasEl.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) this.updateMouseCoords(e.touches[0]);
    }, { passive: true });
    window.addEventListener("touchend", () => { this.mouse.isDown = false; });

    // Universal Mobile Virtual Joystick
    const joyZone = document.getElementById("mobile-joystick-zone");
    const joyBase = document.getElementById("joystick-base");
    const joyThumb = document.getElementById("joystick-thumb");

    if (joyZone && joyBase && joyThumb) {
      let joyTouchId = null;
      let centerX = 0, centerY = 0;
      const maxRadius = 38;

      joyZone.addEventListener("touchstart", (e) => {
        e.preventDefault();
        checkTouch();
        const touch = e.changedTouches[0];
        joyTouchId = touch.identifier;
        const rect = joyBase.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }, { passive: false });

      window.addEventListener("touchmove", (e) => {
        if (joyTouchId === null) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
          const touch = e.changedTouches[i];
          if (touch.identifier === joyTouchId) {
            e.preventDefault();
            const dx = touch.clientX - centerX;
            const dy = touch.clientY - centerY;
            const dist = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx);
            const clampedDist = Math.min(dist, maxRadius);
            const thumbX = Math.cos(angle) * clampedDist;
            const thumbY = Math.sin(angle) * clampedDist;

            joyThumb.style.transform = `translate(${thumbX}px, ${thumbY}px)`;
            this.joystick.vx = thumbX / maxRadius;
            this.joystick.vy = -thumbY / maxRadius; // inverted so up is positive
            break;
          }
        }
      }, { passive: false });

      const resetJoy = (e) => {
        if (joyTouchId === null) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === joyTouchId) {
            joyTouchId = null;
            joyThumb.style.transform = "translate(0px, 0px)";
            this.joystick.vx = 0;
            this.joystick.vy = 0;
            break;
          }
        }
      };

      window.addEventListener("touchend", resetJoy);
      window.addEventListener("touchcancel", resetJoy);
    }

    // Mobile Warp Dash Button
    const mobileDashBtn = document.getElementById("btn-mobile-dash");
    if (mobileDashBtn) {
      mobileDashBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        checkTouch();
        this.triggerDash();
      }, { passive: false });
      mobileDashBtn.addEventListener("click", () => {
        this.triggerDash();
      });
    }

    // UI Buttons
    document.getElementById("btn-sound-toggle").addEventListener("click", () => {
      this.sound.enabled = !this.sound.enabled;
      document.getElementById("btn-sound-toggle").textContent = this.sound.enabled ? "🔊" : "🔇";
    });

    const controlsToggleBtn = document.getElementById("btn-controls-toggle");
    if (controlsToggleBtn) {
      controlsToggleBtn.addEventListener("click", () => {
        const mc = document.getElementById("mobile-controls");
        if (mc) {
          mc.classList.toggle("hidden");
          const isHidden = mc.classList.contains("hidden");
          controlsToggleBtn.textContent = isHidden ? "🕹️ Controls" : "🕹️ Controls [ON]";
        }
      });
    }

    const playHeroBtn = document.getElementById("btn-play-hero");
    if (playHeroBtn) {
      playHeroBtn.addEventListener("click", () => {
        this.startLevel(this.currentLevel || 1);
      });
    }

    const quickPlayBtn = document.getElementById("btn-quick-play");
    if (quickPlayBtn) {
      quickPlayBtn.addEventListener("click", () => {
        this.startLevel(1);
      });
    }

    const unlockAllBtn = document.getElementById("btn-unlock-all");
    if (unlockAllBtn) {
      unlockAllBtn.addEventListener("click", () => {
        this.progress.highestLevel = 10;
        this.saveProgress();
        this.renderLevelMap();
      });
    }

    // Game Over Retry / Map actions
    const goRetry = document.getElementById("btn-gameover-retry");
    if (goRetry) {
      goRetry.addEventListener("click", () => {
        this.startLevel(this.currentLevel);
      });
    }
    const goMap = document.getElementById("btn-gameover-map");
    if (goMap) {
      goMap.addEventListener("click", () => {
        this.showScreen("MAP");
      });
    }

    document.getElementById("btn-map-nav").addEventListener("click", () => {
      this.showScreen("MAP");
    });

    document.getElementById("btn-hint").addEventListener("click", () => {
      document.getElementById("q-hint-box").classList.toggle("hidden");
    });

    // Question options
    document.querySelectorAll(".opt-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        this.submitAnswer(idx);
      });
    });

    // Learn mode actions
    document.getElementById("btn-learn-retry").addEventListener("click", () => {
      this.showQuestionModal(this.activeQuestion);
    });
    document.getElementById("btn-learn-continue").addEventListener("click", () => {
      this.showScreen("PLAYING");
    });
    document.getElementById("btn-learn-map").addEventListener("click", () => {
      this.showScreen("MAP");
    });

    // Level complete actions
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

  updateMouseCoords(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    this.mouse.x = nx;
    this.mouse.y = ny;
  }

  triggerDash() {
    if (this.state !== "PLAYING") return;
    if (this.player.dashCooldown <= 0 && !this.player.isDashing) {
      this.player.isDashing = true;
      this.player.dashTimer = 0.45;
      this.player.dashCooldown = 1.8;
      this.sound.playDash();

      // Camera FOV dynamic warp expansion
      this.targetFov = 75;

      // Pulse engine light
      if (this.enginePointLight) {
        this.enginePointLight.intensity = 5.0;
        this.enginePointLight.color.setHex(0x00ffff);
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
    const gModal = document.getElementById("gameover-modal");
    if (gModal) gModal.classList.add("hidden");

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
    } else if (target === "GAMEOVER") {
      if (gModal) gModal.classList.remove("hidden");
    }
  }

  renderLevelMap() {
    const container = document.getElementById("map-trail");
    container.innerHTML = "";

    let totalStars = 0;
    LEVEL_CONFIGS_3D.forEach((lvl, idx) => {
      const isUnlocked = lvl.level <= this.progress.highestLevel;
      const starsEarned = this.progress.stars[idx] || 0;
      totalStars += starsEarned;

      const node = document.createElement("div");
      node.className = `map-node ${isUnlocked ? "" : "locked"}`;
      node.style.borderColor = isUnlocked ? `#${lvl.planetColor.toString(16).padStart(6, '0')}` : "rgba(255,255,255,0.1)";

      let starsStr = "";
      for (let s = 0; s < 3; s++) {
        starsStr += (s < starsEarned) ? "⭐" : "▫️";
      }

      node.innerHTML = `
        <div class="node-planet-badge" style="background: #${lvl.planetColor.toString(16).padStart(6, '0')};">
          ${isUnlocked ? lvl.emoji : "🔒"}
        </div>
        <div class="node-class-name">${lvl.class}</div>
        <div class="node-subjects">${lvl.subjects}</div>
        <div class="node-stars">${isUnlocked ? starsStr : "Locked"}</div>
        ${isUnlocked ? `<button class="node-play-btn">▶ Play ${lvl.class}</button>` : ''}
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
    this.config = LEVEL_CONFIGS_3D[lvlNum - 1];

    this.score = 0;
    this.lives = 3;
    this.coins = 0;
    this.correctCount = 0;
    this.attemptCount = 0;

    // Reset 3D player position & physics
    this.player.x = 0;
    this.player.y = 0;
    this.player.z = 0;
    this.player.roll = 0;
    this.player.pitch = 0;
    this.player.isDashing = false;
    this.player.dashCooldown = 0;
    this.player.invulnerableTimer = 0;

    if (this.player.mesh) {
      this.player.mesh.position.set(0, 0, 0);
      this.player.mesh.rotation.set(0, 0, 0);
    }

    // Apply 3D Theme colors
    this.scene.fog.color.setHex(this.config.fogColor);
    this.ambientLight.color.setHex(this.config.ambient);
    this.sunLight.color.setHex(this.config.sunColor);
    this.distantPlanet.material.color.setHex(this.config.planetColor);

    // Clear old entities
    this.obstacles.forEach(o => this.scene.remove(o.mesh));
    this.coinsInWorld.forEach(c => this.scene.remove(c.mesh));
    this.obstacles = [];
    this.coinsInWorld = [];

    this.lastObsSpawn = performance.now();
    this.lastCoinSpawn = performance.now() + 800;

    await this.loadQuestionBank(lvlNum);
    this.updateHUD();
    this.showScreen("PLAYING");

    // Immediate initial wave ahead so player sees action in 2 seconds!
    this.spawn3DCoin(-45, 0, 0);
    this.spawn3DAsteroid(-75, -2.5, 1);
    this.spawn3DCoin(-110, 2.5, 0);
  }

  async loadQuestionBank(lvlNum) {
    if (!this.questionBanks[lvlNum]) {
      try {
        const res = await fetch(`QuestionBanks/level_${lvlNum}.json`);
        this.questionBanks[lvlNum] = await res.json();
      } catch (e) {
        console.warn(`Fallback for level_${lvlNum}.json`);
        this.questionBanks[lvlNum] = {
          level: lvlNum,
          questions: [
            {
              id: "FB-001", subject: "Math", topic: "Basics", difficulty: "easy",
              questionText: "What is 4 + 3?",
              options: ["6", "7", "8", "9"], correctIndex: 1,
              solutionSteps: ["Count 4.", "Add 3 more: 5, 6, 7.", "4 + 3 = 7."],
              hint: "Count 3 forward from 4."
            }
          ]
        };
      }
    }

    this.currentBank = this.questionBanks[lvlNum];
    this.questionQueue = [...this.currentBank.questions].sort(() => Math.random() - 0.5);
  }

  updateHUD() {
    document.getElementById("hud-level-badge").textContent = `${this.config.class} • ${this.config.zone}`;
    document.getElementById("hud-score-val").textContent = this.score;
    document.getElementById("hud-coins-val").textContent = `🪙 ${this.coins}`;

    // Lives
    const livesDiv = document.getElementById("hud-lives");
    livesDiv.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const span = document.createElement("span");
      span.className = "heart-icon";
      span.textContent = (i < this.lives) ? "❤️" : "🖤";
      livesDiv.appendChild(span);
    }

    // Progress Bar
    const pct = Math.min(100, Math.floor((this.coins / this.config.targetCoins) * 100));
    document.getElementById("hud-progress-fill").style.width = `${pct}%`;
    document.getElementById("hud-progress-text").textContent = `${this.coins} / ${this.config.targetCoins} Coins`;
  }

  handlePlayerInput(dt) {
    let moveX = 0, moveY = 0;

    // 1. Keyboard Controls (WASD & Arrow Keys)
    if (this.keys["ArrowLeft"] || this.keys["KeyA"]) moveX -= 1;
    if (this.keys["ArrowRight"] || this.keys["KeyD"]) moveX += 1;
    if (this.keys["ArrowUp"] || this.keys["KeyW"]) moveY += 1;
    if (this.keys["ArrowDown"] || this.keys["KeyS"]) moveY -= 1;

    // 2. Mobile Virtual Joystick
    if (this.joystick.vx !== 0 || this.joystick.vy !== 0) {
      moveX += this.joystick.vx;
      moveY += this.joystick.vy;
    }

    // 3. Mouse / Canvas Touch Drag
    if (this.mouse.isDown) {
      moveX += Math.min(1, Math.max(-1, this.mouse.x * 1.5));
      moveY += Math.min(1, Math.max(-1, this.mouse.y * 1.5));
    }

    // Normalize diagonal velocity
    const len = Math.hypot(moveX, moveY);
    if (len > 1) {
      moveX /= len;
      moveY /= len;
    }

    let speed = 18.0;
    if (this.player.isDashing) speed *= 1.35;

    this.player.x += moveX * speed * dt;
    this.player.y += moveY * speed * dt;

    // 3D flight boundaries
    this.player.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, this.player.x));
    this.player.y = Math.max(this.bounds.minY, Math.min(this.bounds.maxY, this.player.y));

    // Dynamic 3D Banking (Roll and Pitch)
    const targetRoll = -moveX * 0.45;
    const targetPitch = moveY * 0.25;
    this.player.roll = THREE.MathUtils.lerp(this.player.roll, targetRoll, 10 * dt);
    this.player.pitch = THREE.MathUtils.lerp(this.player.pitch, targetPitch, 10 * dt);

    if (this.player.mesh) {
      this.player.mesh.position.set(this.player.x, this.player.y, this.player.z);
      this.player.mesh.rotation.z = this.player.roll;
      this.player.mesh.rotation.x = this.player.pitch;

      // Invulnerability flashing
      if (this.player.invulnerableTimer > 0) {
        this.player.mesh.visible = Math.floor(performance.now() / 80) % 2 === 0;
      } else {
        this.player.mesh.visible = true;
      }
    }

    // Camera follow dampening with engine rumble micro-shake during warp dash
    const rumbleX = this.player.isDashing ? (Math.random() - 0.5) * 0.12 : 0;
    const rumbleY = this.player.isDashing ? (Math.random() - 0.5) * 0.12 : 0;
    const targetCamX = this.player.x * 0.4 + rumbleX;
    const targetCamY = this.player.y * 0.4 + 4.5 + rumbleY;
    this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, targetCamX, 6 * dt);
    this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetCamY, 6 * dt);

    // Dynamic FOV for warp dash
    const targetFov = this.player.isDashing ? 72 : 60;
    this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFov, 8 * dt);
    this.camera.updateProjectionMatrix();

    // Dash timers
    if (this.player.isDashing) {
      this.player.dashTimer -= dt;
      if (this.player.dashTimer <= 0) {
        this.player.isDashing = false;
        if (this.enginePointLight) this.enginePointLight.intensity = 3.2;
      }
    }
    if (this.player.dashCooldown > 0) {
      this.player.dashCooldown -= dt;
    }

    // Dash HUD gauge
    const dashRatio = Math.max(0, 1 - (this.player.dashCooldown / 1.8));
    document.getElementById("hud-dash-fill").style.width = `${dashRatio * 100}%`;
    const label = document.querySelector(".dash-label");
    if (this.player.dashCooldown <= 0) {
      label.textContent = "WARP DASH [READY]";
      label.style.color = "#00e5ff";
    } else {
      label.textContent = "CHARGING...";
      label.style.color = "#8da4c4";
    }

    // Mobile Dash button cooldown
    const mobileCooldownEl = document.getElementById("mobile-dash-cooldown");
    if (mobileCooldownEl) {
      const cdPct = Math.max(0, this.player.dashCooldown / 1.8) * 100;
      mobileCooldownEl.style.transform = `translateY(${100 - cdPct}%)`;
    }

    if (this.player.invulnerableTimer > 0) {
      this.player.invulnerableTimer -= dt;
    }
  }

  spawn3DEntities(now) {
    const ramp = this.coins * 0.05;
    const obsInterval = Math.max(1300, (this.config.obsRate - ramp) * 1000);
    const coinInterval = this.config.coinRate * 1000;

    // Spawn 3D Asteroid
    if (now - this.lastObsSpawn > obsInterval) {
      this.lastObsSpawn = now;
      this.spawn3DAsteroid();
    }

    // Spawn 3D Question Coin
    if (now - this.lastCoinSpawn > coinInterval) {
      this.lastCoinSpawn = now;
      this.spawn3DCoin();
    }
  }

  spawn3DAsteroid(customZ, customX, customY) {
    const radius = Math.random() * 0.9 + 1.2;
    // Craggy 3D asteroid geometry with dual-frequency crater displacement
    const geo = new THREE.DodecahedronGeometry(radius, 2);
    const posAttr = geo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      // Dual-frequency crater and boulder deformation
      const lowFreq = (Math.sin(vx * 1.5) + Math.cos(vy * 1.5) + Math.sin(vz * 1.5)) * 0.22;
      const craterNoise = (Math.sin(vx * 4.2) * Math.cos(vz * 4.2)) * 0.12;
      const factor = 1.0 + lowFreq + craterNoise;
      posAttr.setXYZ(i, vx * factor, vy * factor, vz * factor);
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      color: 0x8a847e,
      roughness: 0.72,
      metalness: 0.65,
      bumpMap: this.textures.asteroid,
      bumpScale: 0.22,
      metalnessMap: this.textures.asteroidOre,
      roughnessMap: this.textures.asteroidOre
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const spawnX = customX !== undefined ? customX : (Math.random() - 0.5) * 26;
    const spawnY = customY !== undefined ? customY : (Math.random() - 0.5) * 14 + 1.5;
    const spawnZ = customZ !== undefined ? customZ : -130;
    mesh.position.set(spawnX, spawnY, spawnZ);

    this.scene.add(mesh);

    this.obstacles.push({
      mesh: mesh,
      radius: radius,
      rotSpeedX: Math.random() * 2 - 1,
      rotSpeedY: Math.random() * 2 - 1,
      rotSpeedZ: Math.random() * 2 - 1
    });
  }

  spawn3DCoin(customZ, customX, customY) {
    const coinGroup = new THREE.Group();

    // 1. 3D Golden Disc with Embossed Star Crest & High-Gloss Lacquer
    const coinGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.26, 32);
    const coinMat = new THREE.MeshPhysicalMaterial({
      color: 0xffd700,
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: 0x4a2e00,
      bumpMap: this.textures.coin,
      bumpScale: 0.1
    });
    const disc = new THREE.Mesh(coinGeo, coinMat);
    disc.rotation.x = Math.PI / 2;
    disc.castShadow = true;
    coinGroup.add(disc);

    // 2. Kinetic Concentric Energy Rings (Inner Cyan & Outer Gold)
    const innerRingGeo = new THREE.TorusGeometry(1.65, 0.06, 16, 40);
    const innerRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    coinGroup.add(innerRing);

    const outerRingGeo = new THREE.TorusGeometry(2.1, 0.05, 16, 48);
    const outerRingMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = 0.55;
    coinGroup.add(outerRing);

    // 3. Dynamic Radiant Point Light
    const light = new THREE.PointLight(0xffea00, 2.5, 14);
    coinGroup.add(light);

    const spawnX = customX !== undefined ? customX : (Math.random() - 0.5) * 18;
    const spawnY = customY !== undefined ? customY : (Math.random() - 0.5) * 12 + 1;
    const spawnZ = customZ !== undefined ? customZ : -130;
    coinGroup.position.set(spawnX, spawnY, spawnZ);

    this.scene.add(coinGroup);

    this.coinsInWorld.push({
      mesh: coinGroup,
      innerRing: innerRing,
      outerRing: outerRing,
      baseY: spawnY,
      radius: 1.6,
      life: 0
    });
  }

  update3DEntities(dt) {
    const forwardSpeed = this.config.speed * (this.player.isDashing ? 1.35 : 1.0);

    // 1. Asteroids
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.mesh.position.z += forwardSpeed * dt * 1.2;
      obs.mesh.rotation.x += obs.rotSpeedX * dt;
      obs.mesh.rotation.y += obs.rotSpeedY * dt;

      // 3D Spherical Collision check
      const dx = this.player.x - obs.mesh.position.x;
      const dy = this.player.y - obs.mesh.position.y;
      const dz = this.player.z - obs.mesh.position.z;
      const dist = Math.hypot(dx, dy, dz);

      if (dist < obs.radius + 2.0 && this.player.invulnerableTimer <= 0 && !this.player.isDashing) {
        this.playerHit3D(obs.mesh.position);
      }

      // Despawn once behind camera
      if (obs.mesh.position.z > 25) {
        this.scene.remove(obs.mesh);
        this.obstacles.splice(i, 1);
      }
    }

    // 2. Coins
    for (let i = this.coinsInWorld.length - 1; i >= 0; i--) {
      const coin = this.coinsInWorld[i];
      coin.life += dt;
      coin.mesh.position.z += forwardSpeed * dt * 1.2;
      coin.mesh.position.y = coin.baseY + Math.sin(coin.life * 4) * 0.8;
      coin.mesh.rotation.y += 3.5 * dt;

      // Concentric kinetic ring counter-rotation
      if (coin.innerRing) {
        coin.innerRing.rotation.z += 4.5 * dt;
      }
      if (coin.outerRing) {
        coin.outerRing.rotation.z -= 3.8 * dt;
        coin.outerRing.rotation.y += 2.0 * dt;
      }

      // 3D Collision check & Magnetic Tractor Pull
      const dx = this.player.x - coin.mesh.position.x;
      const dy = this.player.y - coin.mesh.position.y;
      const dz = this.player.z - coin.mesh.position.z;
      const dist = Math.hypot(dx, dy, dz);

      // Gentle magnetic tractor pull: when close, coin glides toward ship
      if (dist < 8.0 && dist > 0.1) {
        const pullSpeed = 16.0 * dt;
        coin.mesh.position.x += dx * pullSpeed;
        coin.mesh.position.y += dy * pullSpeed;
      }

      if (dist < coin.radius + 2.8) {
        const coinPos = coin.mesh.position.clone();
        this.scene.remove(coin.mesh);
        this.coinsInWorld.splice(i, 1);
        this.collectCoin3D(coinPos);
        break;
      }

      if (coin.mesh.position.z > 25) {
        this.scene.remove(coin.mesh);
        this.coinsInWorld.splice(i, 1);
      }
    }
  }

  playerHit3D(pos) {
    this.lives--;
    this.player.invulnerableTimer = 1.8;
    this.sound.playHit();
    this.updateHUD();

    // Activate Holographic Energy Shield
    if (this.shieldMesh) {
      this.shieldMesh.visible = true;
      this.shieldMesh.material.opacity = 0.85;
    }

    // Impact rock shrapnel explosion
    if (pos && this.particleFX) {
      this.particleFX.spawnImpactRubble(pos.x, pos.y, pos.z);
    }

    if (this.lives <= 0) {
      this.showScreen("GAMEOVER");
    }
  }

  collectCoin3D(pos) {
    this.sound.playCoin();
    if (pos && this.particleFX) {
      this.particleFX.spawnCoinExplosion(pos.x, pos.y, pos.z);
    }

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

    // 4 pastel buttons
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
    this.attemptCount++;
    const isCorrect = (chosenIdx === this.activeQuestion.correctIndex);
    const buttons = document.querySelectorAll(".opt-btn");

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

    document.getElementById("complete-level-title").textContent = `${this.config.class} Cleared! 🎓`;
    document.getElementById("complete-subtitle").textContent = `Fantastic job mastering ${this.config.zone}!`;

    let starsStr = "";
    for (let s = 0; s < 3; s++) starsStr += (s < stars) ? "⭐" : "▫️";
    document.getElementById("complete-stars-row").textContent = starsStr;

    document.getElementById("complete-score-val").textContent = this.score;
    document.getElementById("complete-coins-val").textContent = this.coins;
    document.getElementById("complete-accuracy-val").textContent = `${Math.round(accuracy * 100)}%`;

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

  animate(now) {
    const dt = Math.min(0.08, (now - this.lastFrameTime) / 1000);
    this.lastFrameTime = now;

    if (this.state === "PLAYING") {
      this.handlePlayerInput(dt);
      this.spawn3DEntities(now);
      this.update3DEntities(dt);
      this.updateWarpStarfield(dt, this.player.isDashing ? 1.5 : 1.0);

      // Continuous high-velocity engine spark particles behind twin nacelles
      if (this.particleFX && this.player.mesh) {
        [-3.6, 3.6].forEach((offset) => {
          this.particleFX.spawnEngineSparks(
            this.player.x + offset * 0.78,
            this.player.y + 0.15,
            this.player.z + 3.2,
            this.player.isDashing
          );
        });
      }
    } else {
      // Gentle idle starfield motion when paused/in modal
      this.updateWarpStarfield(dt, 0.25);
    }

    // Update real-time particle systems (sparks, explosions, rubble, rings)
    if (this.particleFX) {
      this.particleFX.update(dt, this.camera);
    }

    // Animate aviation navigation lights (strobe beacons on fins)
    if (this.navLights && this.navLights.length > 0) {
      const strobeOn = Math.floor(now / 380) % 2 === 0;
      this.navLights.forEach((light, i) => {
        if (i % 2 === 1) {
          light.material.opacity = strobeOn ? 1.0 : 0.2;
        }
      });
    }

    // Animate Holographic Energy Shield
    if (this.shieldMesh) {
      if (this.player.invulnerableTimer > 0) {
        this.shieldMesh.visible = true;
        const pulse = 0.45 + Math.sin(now * 0.02) * 0.35;
        this.shieldMesh.material.opacity = pulse;
        const s = 1.0 + Math.sin(now * 0.015) * 0.04;
        this.shieldMesh.scale.set(s, s, s);
      } else {
        this.shieldMesh.visible = false;
      }
    }

    // Animate dual plasma thruster flames on twin nacelles
    if (this.thrusterFlames) {
      const flicker = 1.0 + Math.sin(now * 0.035) * 0.25 + (this.player.isDashing ? 1.4 : 0.0);
      this.thrusterFlames.forEach(f => {
        if (f) f.scale.set(1.0, flicker, 1.0);
      });
    }

    // Animate supersonic Mach shock diamonds (standing shockwave discs)
    if (this.machDiamonds) {
      const dashBoost = this.player && this.player.isDashing ? 1.4 : 1.0;
      this.machDiamonds.forEach((d) => {
        const pulse = Math.sin(now * 0.035 + d.idx * 1.8) * 0.2 + 1.0;
        d.mesh.scale.set(pulse * dashBoost, pulse * dashBoost, 1.0);
        d.mesh.rotation.z += 4.0 * dt;
      });
    }

    // Dynamic engine light pulsation
    if (this.enginePointLight) {
      const baseLight = this.player && this.player.isDashing ? 6.5 : 3.5;
      this.enginePointLight.intensity = baseLight + Math.sin(now * 0.02) * 0.4;
    }

    // Slowly rotate solar corona flare
    if (this.sunCorona) {
      this.sunCorona.rotation.z += 0.04 * dt;
    }

    // Slowly drift volumetric nebulae
    if (this.nebulaGroup) {
      this.nebulaGroup.rotation.z += 0.012 * dt;
    }

    // Slowly rotate distant celestial planet & rings
    if (this.distantPlanet) {
      this.distantPlanet.rotation.y += 0.05 * dt;
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame((t) => this.animate(t));
  }
}

// Start 3D Game
window.addEventListener("DOMContentLoaded", () => {
  window.spaceGame3D = new SpaceGame3D();
});
