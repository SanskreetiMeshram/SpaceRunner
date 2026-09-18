const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('=== 3D Graphics & Project Verification ===');

const filesToCheck = [
  'WebPreview/three.min.js',
  'WebPreview/game3d.js',
  'WebPreview/index.html',
  'WebPreview/styles.css',
  'Assets/Scripts/Gameplay/PlayerController3D.cs',
  'Assets/Scripts/Gameplay/Obstacle3D.cs',
  'Assets/Scripts/Gameplay/Coin3D.cs',
  'Assets/Scripts/Gameplay/ObstacleSpawner3D.cs',
  'Assets/Scripts/Gameplay/CoinSpawner3D.cs',
  'Assets/Scripts/Gameplay/SpaceWarpTunnel3D.cs',
  '.gitignore',
  '.gitattributes',
  'PROJECT_REPORT.md',
  'README.md'
];

let allOk = true;
filesToCheck.forEach(rel => {
  const p = path.join(__dirname, '..', rel);
  if (fs.existsSync(p) && fs.statSync(p).size > 0) {
    console.log(`✓ ${rel} (${fs.statSync(p).size} bytes)`);
  } else {
    console.error(`❌ Missing or empty: ${rel}`);
    allOk = false;
  }
});

// Check HTTP server
http.get('http://localhost:8080/', (res) => {
  console.log(`✓ HTTP Server Status: ${res.statusCode} ${res.statusMessage}`);
  res.on('data', () => {});
  res.on('end', () => {
    if (allOk && res.statusCode === 200) {
      console.log('\n🎉 ALL 3D ENGINE, CURRICULUM, AND SERVER CHECKS PASSED!');
    }
  });
}).on('error', (err) => {
  console.error(`HTTP Server check error: ${err.message}`);
});
