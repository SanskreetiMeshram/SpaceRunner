# 🚀 Spaceship Runner — 3D Space Runner (Class 1 to 10)

A colorful, kid-friendly 3D space-runner game where players pilot a **Lowpoly Spaceship Fighter** (inspired by the Sketchfab ready game asset) through space, dodge obstacles, collect coins, and answer curriculum-based quiz questions aligned with school grades (Class 1 to Class 10).

When players get an answer wrong, the game pauses on a friendly **"Let's Learn!" Screen** showing a clear, step-by-step plain-language solution so they actually learn before continuing!

---

## 🎮 Play Now

The 3D WebGL edition is running locally at:
👉 **[http://localhost:8080/](http://localhost:8080/)**

### Controls:
- **Move UFO:** `W, A, S, D` or `Arrow Keys` (or click & drag with mouse/touch)
- **SHIFT Dash:** `Left Shift` or `Space` (boosts speed, expands FOV warp)
- **Collect Coins:** Fly into floating gold coins to open curriculum questions

---

## 📚 Curriculum Zones (10 Levels)

- **Class 1:** Math only (Counting 1–20, single-digit addition/subtraction, shapes, more/less)
- **Class 2:** Math only (Addition/subtraction up to 100, tables 2, 5, 10, place value)
- **Class 3:** Math only (Multiplication tables up to 10, division, fractions 1/2 and 1/4, measurement units)
- **Class 4:** Math + EVS (Multi-digit mul/div, decimals, perimeter, plants, water cycle)
- **Class 5:** Math + Science (Percentages, LCM/HCF, angles, 3 states of matter, human body)
- **Class 6:** Math + Science (Integers, basic algebra, ratios, nutrients, periodic motion)
- **Class 7:** Math + Science (Rational numbers, equations, heat transfer, acids/bases, photosynthesis)
- **Class 8:** Full Syllabus (Exponents, mensuration, force & pressure, friction, sound, cell biology)
- **Class 9:** Full Syllabus (Polynomials, coordinate geometry, Newton's laws, gravitation, atoms)
- **Class 10:** Board Syllabus (Quadratic equations, trigonometry, light/optics, Ohm's law, genetics)

---

## 🛠️ Tech Stack & Structure

- **3D Web Engine:** Three.js WebGL with PBR metallic UFO, spinning 3D coins, 3D tumbling asteroids, and warp starfield.
- **Unity C# Engine:** Unity 2021/2022/6000 LTS compatible with 3D physics, object pooling, and responsive UI.
- **Question Banks:** 10 curriculum-accurate JSON files in `Assets/Resources/QuestionBanks/` (200 questions total).
- **Report Document:** See [`PROJECT_REPORT.md`](PROJECT_REPORT.md) for full architecture and pedagogical documentation.
