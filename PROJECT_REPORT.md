# Spaceship Runner — Comprehensive Project & Technical Report

**Project Name:** Spaceship Runner (3D Space Runner)  
**Target Audience:** Students from Class 1 through Class 10 (Ages 6–16)  
**Technology Stack:** Unity (C#) & Three.js WebGL (JavaScript/HTML5)  
**Repository Path:** `d:\Dnnovate\Spacegame`  
**Live Web Server:** `http://localhost:8080/`  

---

## 1. Executive Summary & Vision

**"Spaceship Runner"** is an advanced 3D space-runner that seamlessly blends fast-paced evasive arcade gameplay with CBSE/NCERT curriculum-aligned education. Flying a sleek, metallic 3D Spaceship Fighter through cosmic highways, students dodge tumbling asteroids and collect glowing 3D question coins. Touching a coin pauses the flight to present an age-appropriate curriculum question.

Unlike traditional educational games that abruptly punish failure, **Spaceship Runner** places learning at the center through its **"Let's Learn!" Mode**: whenever a student selects an incorrect answer, the game enters an encouraging, step-by-step walkthrough screen with plain-language explanations and mascot support, transforming mistakes into positive learning opportunities.

---

## 2. Advanced 3D Graphics & Visual Architecture

### 2.1 3D Spaceship Fighter Model (Sketchfab Ready Game Asset Integration)
- **Model Reference:** Recreated from the *"Lowpoly Spaceship Fighter Ready Game Asset"* by ferofluid (`60e80573671b49dbbf110c0235506e2b`).
- **Fuselage:** Elongated delta spearhead with military teal/mint camouflage armor (`0x489b88`), dark charcoal underbelly (`0x1e293b`), and white racing decal stripes (`0xecfdf5`).
- **Canopy & Sensors:** Smoked glass cockpit spine (`MeshPhysicalMaterial`), magenta targeting optical sensor at the tip, and twin cyan sensor pods.
- **Twin Outboard Nacelles:** Dual heavy turbine engines mounted on swept wing pylons with front air intakes, vertical stabilizer fins, and glowing cyan wingtip beacons (`0x00f5ff`).
- **Dual Plasma Exhausts:** High-velocity plasma thruster flame cones with dynamic lighting and real-time flicker/flickering animation.
- **Dynamic 3D Banking & Aerodynamics:** Real-time interpolated Euler roll (Z-axis tilt up to 28°) and pitch (X-axis tilt up to 18°) when maneuvering horizontally and vertically.

### 2.2 3D Question Coins
- **Mesh:** Thick beveled golden medallion (`CylinderGeometry`) with high metallic reflectance and an outer glowing energy torus (`TorusGeometry`).
- **Dynamic Point Light:** Emits warm amber/gold illumination (radius 10 units, intensity 2.0).
- **Animations:** Multi-axis continuous spin on Y and Z axes combined with a vertical sine-wave hovering motion ($y = y_0 + 0.8 \sin(4t)$).

### 2.3 3D Deformed Asteroids
- **Procedural Geometry:** Created from `DodecahedronGeometry` with randomized trigonometric vertex displacement to form authentic, irregular cratered surfaces.
- **Tumbling Physics:** Rotates continuously across all three axes (pitch, yaw, and roll) with randomized angular velocities.

### 2.4 Hyperspace Warp Starfield & SHIFT Dash
- **3D Particle Tunnel:** Over 2,400 individual stars distributed in a cylindrical volume extending 450 units into deep Z-space.
- **SHIFT Warp Dash:**
  - Pressing `SHIFT` or `Space` engages warp thrusters.
  - Ship forward velocity increases smoothly by **135%** (carefully tuned for comfortable, kid-friendly control without disorienting rush).
  - Camera Field of View dynamically expands from **60° to 72°** (warp tunnel lens effect).
  - Starfield particles stretch into gentle high-speed light streaks.

---

## 3. Curriculum Mapping (Class 1 to Class 10)

The curriculum is structured into **10 distinct cosmic zones**, each with unique lighting, fog colors, and topic depth. Total question bank: **200 verified curriculum questions** (20 per grade level).

### Grade-Wise Progression Overview

| Class | Level Name | Subjects | Design Strategy & Content |
|---|---|---|---|
| **Class 1** | Playful Stardust Nebula | Math Only | **Kid-Friendly Basics:** Large numbers, minimal text. Counting 1–20 (★ stars), single-digit addition/subtraction (3+2, 5-1), basic 2D shapes (triangle has 3 sides, circle has no corners), and size comparisons (more vs less). |
| **Class 2** | Azure Crystal Belt | Math Only | **Early Elementary Math:** 2-digit addition and subtraction up to 100, multiplication tables (2, 5, 10), place value (tens and ones), simple time (60 min in an hour) and money word problems. |
| **Class 3** | Emerald Aurora Fields | Math Only | Multiplication tables up to 10, division, fractions (1/2, 1/4), measurement conversions (1 m = 100 cm, 1 kg = 1000 g, 1 L = 1000 mL), and perimeter basics. |
| **Class 4** | Golden Solar Flare Way | Math + EVS | Multi-digit multiplication/division, decimals (0.5 = 1/2), chlorophyll & plant leaves, desert animal adaptations (camels), water cycle (evaporation), and biodegradable waste. |
| **Class 5** | Deep Ocean Galaxy | Math + Science | Percentages (50%, 25%), LCM/HCF, angles (acute, right, obtuse), 3 states of matter, human heart and digestive organs, and seed germination conditions. |
| **Class 6** | Amethyst Pulsar Cluster | Math + Science | Negative integers (-7 + 12 = 5), introductory algebra ($x + 8 = 20$), ratios, food nutrients (proteins, iron/anaemia, vitamin C/scurvy), periodic motion, and light opacity. |
| **Class 7** | Plasma Storm Expanse | Math + Phys + Chem + Bio | Rational numbers, linear equations, heat conduction/convection/radiation, acids/bases/salts (litmus indicator), speed formula ($s = d/t$), photosynthesis, and bile/liver digestion. |
| **Class 8** | Quantum Magnetic Rings | Full Syllabus | Exponents ($a^m \times a^n = a^{m+n}$), mensuration, force & pressure ($P = F/A$), friction, pitch vs frequency, cell powerhouse (mitochondria), and metals vs non-metals. |
| **Class 9** | Supernova Deep Core | Full Syllabus | Polynomials, coordinate quadrants, Newton's Laws ($F = ma$), gravitation ($g \approx 9.8\text{ m/s}^2$), matter changes (sublimation), molecular mass of water ($18\text{ u}$), and plant xylem/phloem tissues. |
| **Class 10** | Master Academy Cosmos | Board-Level Syllabus | Quadratic discriminant ($b^2 - 4ac > 0$), trigonometry ($\sin^2\theta + \cos^2\theta = 1$), Snell's Law / lenses ($1/f = 1/v - 1/u$), Ohm's Law ($V = IR$), carbon catenation, and Mendelian genetics ($3:1$). |

---

## 4. The "Let's Learn!" Pedagogical Screen

The central educational innovation is the **non-punishing wrong-answer screen**:

1. **Header:** *"Not quite — let's learn this together! ✨"* (eliminates discouragement or fear of failure).
2. **Comparison Matrix:**
   - **Your Choice:** Highlighted in soft red with clear label.
   - **Correct Answer:** Highlighted in vibrant emerald green with checkmark.
3. **Illustrated Step-by-Step Breakdown:**
   - Solution broken down into **3 to 4 concise, plain-language numbered steps**.
   - Prefixed with curriculum emoji tags (🧮 Math, ⚡ Physics, ⚗️ Chemistry, 🔬 Biology, 🌿 EVS).
4. **Mascot Reinforcement:**
   - "Nova" the friendly alien robot character shares encouraging words: *"Great try! Now you know it — let's keep flying!" 🚀*
5. **Interactive Mastery Actions:**
   - **"Try Again (Same Question)":** Allows the student to immediately apply their new understanding to get the question right.
   - **"Continue Flying":** Resumes the 3D space runner.
   - **"Level Map":** Returns to the grade progression path.

---

## 5. Technical System Architecture

```
d:\Dnnovate\Spacegame\
├── Assets\                         # Unity C# Game Engine Assets
│   ├── Audio\                      # Synthesized WAV sound effects and BGM
│   ├── Prefabs\                    # Reusable GameObjects
│   ├── Resources\
│   │   └── QuestionBanks\          # 10 JSON banks (level_1.json to level_10.json)
│   ├── Scenes\
│   │   └── MainGame.unity          # Unified 2D/3D responsive scene
│   ├── Scripts\
│   │   ├── Data\                   # QuestionData.cs, LevelConfig.cs, ProgressTracker.cs
│   │   ├── Gameplay\               # PlayerController3D.cs, Obstacle3D.cs, Coin3D.cs,
│   │   │                           # ObstacleSpawner3D.cs, CoinSpawner3D.cs, SpaceWarpTunnel3D.cs
│   │   ├── Managers\               # GameManager.cs, QuestionManager.cs, AudioManager.cs
│   │   └── UI\                     # UIManager.cs, HUDController.cs, LevelMapController.cs,
│   │                               # QuestionPanelUI.cs, LearnModeUI.cs, LevelCompleteUI.cs
│   └── Sprites\                    # High-resolution 2D UI and texture assets
├── Packages\                       # Unity Package Manifest (manifest.json)
├── ProjectSettings\                # Unity ProjectSettings, EditorBuildSettings, TagManager
├── WebPreview\                     # Standalone 3D WebGL Browser Edition
│   ├── Audio\                      # Web audio assets
│   ├── QuestionBanks\              # 10 JSON Question banks
│   ├── game3d.js                   # Three.js 3D space runner engine
│   ├── index.html                  # Responsive game viewport & HUD overlays
│   ├── styles.css                  # Modern kid-friendly UI styling
│   └── three.min.js                # Bundled Three.js r128 library (offline ready)
├── scratch\                        # Build, generation, and verification scripts
├── .gitignore                      # Standard Unity/Web gitignore
├── .gitattributes                  # Normalized line endings and LFS config
└── PROJECT_REPORT.md               # This official document
```

---

## 6. How to Run the Project

### Option A: Immediate 3D Web Play (Currently Running)
The 3D WebGL edition is active via the built-in HTTP server:
- Open your browser to: **[http://localhost:8080/](http://localhost:8080/)**
- **Controls (Auto-Adapting for Laptop & Mobile):**
  - **Laptop/Desktop:** `Arrow Keys` or `W, A, S, D` to steer, `Left Shift` / `Space` to Warp Dash, mouse drag.
  - **Mobile/Tablet:** On-screen Virtual Joystick on left, glowing `⚡ DASH` button on right, direct touch-to-steer.
  - Collect floating gold coins to open curriculum questions!

### Option B: Open in Unity
1. Launch **Unity Hub**.
2. Click **Add** -> **Add project from disk**.
3. Select `d:\Dnnovate\Spacegame`.
4. Open the project with Unity 2021.3 LTS, 2022.3 LTS, or Unity 6.
5. Open `Assets/Scenes/MainGame.unity` and click **Play**!
