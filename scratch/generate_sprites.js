const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table for PNG chunks
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createPNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = Buffer.alloc(12 + 13);
  ihdrChunk.writeUInt32BE(13, 0);
  ihdrChunk.write('IHDR', 4);
  ihdrData.copy(ihdrChunk, 8);
  ihdrChunk.writeUInt32BE(crc32(ihdrChunk.subarray(4, 21)), 21);

  // Scanlines with filter 0x00 prepended to each line
  const rawScanlines = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    const lineOffset = y * (width * 4 + 1);
    rawScanlines[lineOffset] = 0; // Filter None
    rgbaBuffer.copy(rawScanlines, lineOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressedData = zlib.deflateSync(rawScanlines);
  const idatChunk = Buffer.alloc(12 + compressedData.length);
  idatChunk.writeUInt32BE(compressedData.length, 0);
  idatChunk.write('IDAT', 4);
  compressedData.copy(idatChunk, 8);
  idatChunk.writeUInt32BE(crc32(idatChunk.subarray(4, 8 + compressedData.length)), 8 + compressedData.length);

  // IEND
  const iendChunk = Buffer.alloc(12);
  iendChunk.writeUInt32BE(0, 0);
  iendChunk.write('IEND', 4);
  iendChunk.writeUInt32BE(crc32(iendChunk.subarray(4, 8)), 8);

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Helper to set RGBA in buffer
function setPixel(buf, width, x, y, r, g, b, a) {
  if (x < 0 || x >= width || y < 0 || y >= buf.length / (width * 4)) return;
  const idx = (y * width + x) * 4;
  buf[idx] = r;
  buf[idx + 1] = g;
  buf[idx + 2] = b;
  buf[idx + 3] = a;
}

const targetDir = path.join(__dirname, '..', 'Assets', 'Sprites');
const webDir = path.join(__dirname, '..', 'WebPreview', 'Sprites');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(webDir)) fs.mkdirSync(webDir, { recursive: true });

function saveSprite(name, buf) {
  fs.writeFileSync(path.join(targetDir, name), buf);
  fs.writeFileSync(path.join(webDir, name), buf);
  console.log(`Created sprite: ${name}`);
}

// 1. UFO Saucer (64x64)
{
  const w = 64, h = 64;
  const buf = Buffer.alloc(w * h * 4, 0);
  const cx = 32, cy = 32;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = (x - cx) / 26;
      const dy = (y - cy) / 14;
      const distSaucer = dx * dx + dy * dy;

      // Cockpit dome
      const domeDx = (x - cx) / 13;
      const domeDy = (y - (cy - 6)) / 11;
      const distDome = domeDx * domeDx + domeDy * domeDy;

      if (distDome <= 1.0 && y <= cy) {
        // Cyan glass glow
        const glow = Math.floor(180 + 70 * (1 - distDome));
        setPixel(buf, w, x, y, 90, glow, 255, 240);
      } else if (distSaucer <= 1.0) {
        // Saucer metal body (Silver / lavender metallic)
        const shade = Math.floor(180 - y * 1.5);
        setPixel(buf, w, x, y, shade, shade + 20, 240, 255);

        // Indicator lights
        if (Math.abs(y - 33) < 2 && (x % 10 === 0)) {
          setPixel(buf, w, x, y, 255, 240, 80, 255);
        }
      }
    }
  }
  saveSprite('ufo_saucer.png', createPNG(w, h, buf));
}

// 2. UFO Dart (64x64) - Sleek triangular speedster
{
  const w = 64, h = 64;
  const buf = Buffer.alloc(w * h * 4, 0);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Pointing right
      const widthAtX = (x / 60) * 22;
      const distY = Math.abs(y - 32);
      if (x >= 8 && x <= 56 && distY <= widthAtX) {
        // Neon orange/gold speedster
        const grad = Math.floor(255 - (distY / 22) * 80);
        setPixel(buf, w, x, y, 255, grad, 40, 255);
        // Cockpit
        if (x >= 28 && x <= 44 && distY <= 5) {
          setPixel(buf, w, x, y, 60, 220, 255, 250);
        }
      }
    }
  }
  saveSprite('ufo_dart.png', createPNG(w, h, buf));
}

// 3. Golden Question Coin (48x48)
{
  const w = 48, h = 48;
  const buf = Buffer.alloc(w * h * 4, 0);
  const cx = 24, cy = 24, r = 21;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d <= r) {
        // Outer gold rim
        if (d > r - 4) {
          setPixel(buf, w, x, y, 255, 190, 20, 255);
        } else {
          // Inner shiny face
          const shine = Math.floor(240 + 15 * Math.sin((x + y) * 0.3));
          setPixel(buf, w, x, y, 255, shine, 50, 255);
        }
        // Question mark pattern in center
        if (d <= 10) {
          if ((x === cx && y >= 20 && y <= 24) || 
              (y === 17 && Math.abs(x - cx) <= 4) ||
              (x === cx + 4 && y >= 17 && y <= 20) ||
              (x === cx && y === 28)) {
            setPixel(buf, w, x, y, 160, 90, 10, 255);
          }
        }
      }
    }
  }
  saveSprite('coin_gold.png', createPNG(w, h, buf));
}

// 4. Asteroid Obstacle (56x56)
{
  const w = 56, h = 56;
  const buf = Buffer.alloc(w * h * 4, 0);
  const cx = 28, cy = 28;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const angle = Math.atan2(y - cy, x - cx);
      const radiusVar = 22 + 3 * Math.sin(angle * 5) + 2 * Math.cos(angle * 3);
      const d = Math.hypot(x - cx, y - cy);
      if (d <= radiusVar) {
        // Rocky slate/brown texture
        let shade = Math.floor(130 - d * 2.2 + 20 * Math.sin(x * 0.5) * Math.cos(y * 0.5));
        shade = Math.max(50, Math.min(200, shade));
        setPixel(buf, w, x, y, shade + 10, shade, shade - 10, 255);

        // Crater details
        if (Math.hypot(x - 22, y - 22) < 5 || Math.hypot(x - 34, y - 30) < 6) {
          setPixel(buf, w, x, y, Math.max(30, shade - 45), Math.max(30, shade - 45), Math.max(20, shade - 50), 255);
        }
      }
    }
  }
  saveSprite('obstacle_asteroid.png', createPNG(w, h, buf));
}

// 5. Friendly Mascot "Nova" (64x64) - Cheerful Robot Alien with big cute eyes
{
  const w = 64, h = 64;
  const buf = Buffer.alloc(w * h * 4, 0);
  const cx = 32, cy = 34;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Cute round head
      const d = Math.hypot(x - cx, y - cy);
      // Antenna on top
      if (Math.abs(x - cx) <= 2 && y >= 8 && y <= 18) {
        setPixel(buf, w, x, y, 100, 200, 255, 255);
      }
      if (Math.hypot(x - cx, y - 8) <= 4) {
        setPixel(buf, w, x, y, 255, 220, 60, 255); // Antenna bulb
      }

      if (d <= 20) {
        // Pearl white / soft lavender robot visor
        setPixel(buf, w, x, y, 235, 240, 255, 255);

        // Giant happy blue expressive eyes
        const eyeLeft = Math.hypot(x - 25, y - 32);
        const eyeRight = Math.hypot(x - 39, y - 32);
        if (eyeLeft <= 5 || eyeRight <= 5) {
          setPixel(buf, w, x, y, 40, 160, 255, 255);
          // Catchlight pupil sparkle
          if ((x === 24 && y === 30) || (x === 38 && y === 30)) {
            setPixel(buf, w, x, y, 255, 255, 255, 255);
          }
        }

        // Rosy cheeks
        if ((Math.hypot(x - 20, y - 38) <= 3) || (Math.hypot(x - 44, y - 38) <= 3)) {
          setPixel(buf, w, x, y, 255, 140, 160, 200);
        }

        // Warm smiling mouth
        if (y === 41 && Math.abs(x - cx) <= 4) {
          setPixel(buf, w, x, y, 60, 80, 120, 255);
        }
      }
    }
  }
  saveSprite('mascot_nova.png', createPNG(w, h, buf));
}

// 6. Star filled & empty (32x32)
{
  const w = 32, h = 32;
  function makeStar(isFilled) {
    const buf = Buffer.alloc(w * h * 4, 0);
    const cx = 16, cy = 16;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const angle = Math.atan2(y - cy, x - cx);
        // 5 pointed star formula
        const rStar = 13 * (0.55 + 0.45 * Math.cos(5 * angle));
        const d = Math.hypot(x - cx, y - cy);
        if (d <= rStar) {
          if (isFilled) {
            setPixel(buf, w, x, y, 255, 210, 30, 255);
          } else {
            setPixel(buf, w, x, y, 100, 100, 120, 160);
          }
        }
      }
    }
    return createPNG(w, h, buf);
  }
  saveSprite('star_filled.png', makeStar(true));
  saveSprite('star_empty.png', makeStar(false));
}

// 7. Heart Full & Empty (32x32)
{
  const w = 32, h = 32;
  function makeHeart(isFull) {
    const buf = Buffer.alloc(w * h * 4, 0);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const nx = (x - 16) / 10;
        const ny = (16 - y) / 10;
        // Heart equation: (x^2 + y^2 - 1)^3 - x^2 * y^3 <= 0
        const a = nx * nx + ny * ny - 1;
        if (a * a * a - nx * nx * ny * ny * ny <= 0.05) {
          if (isFull) {
            setPixel(buf, w, x, y, 240, 50, 70, 255);
          } else {
            setPixel(buf, w, x, y, 80, 70, 90, 140);
          }
        }
      }
    }
    return createPNG(w, h, buf);
  }
  saveSprite('heart_full.png', makeHeart(true));
  saveSprite('heart_empty.png', makeHeart(false));
}

console.log('All 2D Sprite Assets created successfully!');
