const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getDeterministicGuid(relPath) {
  return crypto.createHash('md5').update('EducationalEdition_' + relPath.replace(/\\/g, '/')).digest('hex');
}

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.endsWith('.meta')) continue;

    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(path.join(__dirname, '..'), fullPath);
    const metaPath = fullPath + '.meta';
    const guid = getDeterministicGuid(relPath);

    if (entry.isDirectory()) {
      if (!fs.existsSync(metaPath)) {
        const folderMeta = `fileFormatVersion: 2\nguid: ${guid}\nfolderAsset: yes\nDefaultImporter:\n  externalObjects: {}\n  userData: \n  assetBundleName: \n  assetBundleVariant: \n`;
        fs.writeFileSync(metaPath, folderMeta);
      }
      processDir(fullPath);
    } else {
      if (!fs.existsSync(metaPath)) {
        let metaContent = '';
        const ext = path.extname(entry.name).toLowerCase();

        if (ext === '.cs') {
          metaContent = `fileFormatVersion: 2\nguid: ${guid}\nMonoImporter:\n  externalObjects: {}\n  serializedVersion: 2\n  defaultReferences: []\n  executionOrder: 0\n  icon: {instanceID: 0}\n  userData: \n  assetBundleName: \n  assetBundleVariant: \n`;
        } else if (ext === '.json' || ext === '.txt') {
          metaContent = `fileFormatVersion: 2\nguid: ${guid}\nTextScriptImporter:\n  externalObjects: {}\n  userData: \n  assetBundleName: \n  assetBundleVariant: \n`;
        } else if (ext === '.png' || ext === '.jpg') {
          metaContent = `fileFormatVersion: 2\nguid: ${guid}\nTextureImporter:\n  fileIDToRecycleName: {}\n  serializedVersion: 12\n  mipmaps:\n    mipMapMode: 0\n    enableMipMap: 0\n  textureType: 8\n  textureShape: 1\n  spriteMode: 1\n  spritePixelsToUnits: 100\n  spriteBorder: {x: 0, y: 0, z: 0, w: 0}\n  spriteGenerateFallbackPhysicsShape: 1\n  alphaUsage: 1\n  alphaIsTransparency: 1\n  spritePivot: {x: 0.5, y: 0.5}\n`;
        } else if (ext === '.wav' || ext === '.mp3') {
          metaContent = `fileFormatVersion: 2\nguid: ${guid}\nAudioImporter:\n  serializedVersion: 6\n  defaultSampleSettings:\n    loadType: 0\n    sampleRateSetting: 0\n    compressionFormat: 0\n    quality: 1\n`;
        } else if (ext === '.unity') {
          metaContent = `fileFormatVersion: 2\nguid: ${guid}\nDefaultImporter:\n  externalObjects: {}\n  userData: \n  assetBundleName: \n  assetBundleVariant: \n`;
        } else {
          metaContent = `fileFormatVersion: 2\nguid: ${guid}\nDefaultImporter:\n  externalObjects: {}\n  userData: \n`;
        }

        fs.writeFileSync(metaPath, metaContent);
      }
    }
  }
}

processDir(path.join(__dirname, '..', 'Assets'));
console.log('All Unity .meta files generated cleanly!');
