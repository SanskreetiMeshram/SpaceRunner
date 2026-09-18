const fs = require('fs');
const path = require('path');

function createWavFile(sampleRate, duration, sampleGenerator) {
  const numSamples = Math.floor(sampleRate * duration);
  const dataSize = numSamples * 2; // 16-bit mono
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(1, 22);  // NumChannels (1 = Mono)
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
  buffer.writeUInt16LE(2, 32);  // BlockAlign
  buffer.writeUInt16LE(16, 34); // BitsPerSample

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = i / numSamples;
    const sampleVal = Math.max(-1, Math.min(1, sampleGenerator(t, progress)));
    const intVal = Math.floor(sampleVal * 32767);
    buffer.writeInt16LE(intVal, 44 + i * 2);
  }

  return buffer;
}

const targetDir = path.join(__dirname, '..', 'Assets', 'Audio');
const webDir = path.join(__dirname, '..', 'WebPreview', 'Audio');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(webDir)) fs.mkdirSync(webDir, { recursive: true });

function saveAudio(name, buf) {
  fs.writeFileSync(path.join(targetDir, name), buf);
  fs.writeFileSync(path.join(webDir, name), buf);
  console.log(`Created audio: ${name}`);
}

const sampleRate = 44100;

// 1. Correct Answer Chime (E5 -> G#5 -> B5 -> E6 sparkling major arpeggio)
const correctWav = createWavFile(sampleRate, 0.6, (t, p) => {
  const notes = [659.25, 830.61, 987.77, 1318.51];
  const noteIdx = Math.min(Math.floor(p * 4), 3);
  const freq = notes[noteIdx];
  const localProg = (p * 4) % 1;
  const env = Math.exp(-localProg * 4) * (1 - p * 0.4);
  const wave = Math.sin(2 * Math.PI * freq * t) * 0.7 + Math.sin(4 * Math.PI * freq * t) * 0.3;
  return wave * env * 0.5;
});
saveAudio('sfx_correct.wav', correctWav);

// 2. Soft Wrong Tone (Warm, encouraging, gentle two-tone chime)
const wrongWav = createWavFile(sampleRate, 0.55, (t, p) => {
  const freq = p < 0.5 ? 392.00 : 329.63; // G4 to E4
  const env = Math.sin(p * Math.PI) * Math.exp(-p * 2);
  return Math.sin(2 * Math.PI * freq * t) * env * 0.45;
});
saveAudio('sfx_wrong_soft.wav', wrongWav);

// 3. Coin Pickup Sparkle
const coinWav = createWavFile(sampleRate, 0.35, (t, p) => {
  const freq = 987.77 + p * 600; // Rising B5 to E6
  const env = Math.exp(-p * 6);
  const wave = Math.sin(2 * Math.PI * freq * t) + 0.4 * Math.sin(6 * Math.PI * freq * t);
  return wave * env * 0.4;
});
saveAudio('sfx_coin.wav', coinWav);

// 4. Dash Whoosh
const dashWav = createWavFile(sampleRate, 0.35, (t, p) => {
  const env = Math.sin(p * Math.PI);
  const noise = (Math.random() * 2 - 1) * 0.5;
  const sub = Math.sin(2 * Math.PI * 90 * t) * 0.5;
  return (noise + sub) * env * 0.5;
});
saveAudio('sfx_dash.wav', dashWav);

// 5. Star Fanfare
const starWav = createWavFile(sampleRate, 0.8, (t, p) => {
  const notes = [523.25, 659.25, 783.99, 1046.50];
  const idx = Math.min(Math.floor(p * 4), 3);
  const freq = notes[idx];
  const localProg = (p * 4) % 1;
  const env = Math.exp(-localProg * 3.5);
  return Math.sin(2 * Math.PI * freq * t) * env * 0.5;
});
saveAudio('sfx_star.wav', starWav);

// 6. Ambient Space BGM Loop (Calming melodic loop)
const bgmWav = createWavFile(sampleRate, 4.0, (t, p) => {
  const pad = Math.sin(2 * Math.PI * 130.81 * t) * 0.25 + 
              Math.sin(2 * Math.PI * 196.00 * t) * 0.2 + 
              Math.sin(2 * Math.PI * 261.63 * t) * 0.15;
  const melodyNotes = [329.63, 392.00, 440.00, 523.25];
  const mIdx = Math.floor((p * 8) % 4);
  const mFreq = melodyNotes[mIdx];
  const mEnv = Math.sin(((p * 8) % 1) * Math.PI);
  const melody = Math.sin(2 * Math.PI * mFreq * t) * mEnv * 0.15;
  return (pad + melody) * 0.6;
});
saveAudio('bgm_space_loop.wav', bgmWav);

console.log('All Audio Assets generated successfully!');
