// This script copies and minifies all .excalidraw files from drawings/ to public/drawings-json/ as .json files, preserving folder structure.
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(process.cwd(), 'drawings');
const DEST_DIR = path.join(process.cwd(), 'public', 'drawings-json');

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function processFiles(src, dest) {
  ensureDirSync(dest);
  fs.readdirSync(src, { withFileTypes: true }).forEach(dirent => {
    const srcPath = path.join(src, dirent.name);
    const destPath = path.join(dest, dirent.name.replace(/\.excalidraw$/, '.json'));
    if (dirent.isDirectory()) {
      processFiles(srcPath, path.join(dest, dirent.name));
    } else if (dirent.isFile() && dirent.name.endsWith('.excalidraw')) {
      try {
        const raw = fs.readFileSync(srcPath, 'utf8');
        const data = JSON.parse(raw);
        const minified = JSON.stringify(data);
        fs.writeFileSync(destPath, minified);
        console.log(`Minified: ${srcPath} -> ${destPath}`);
      } catch (e) {
        console.error(`ERROR: Failed to minify ${srcPath}:`, e);
      }
    }
  });
}

processFiles(SRC_DIR, DEST_DIR);
console.log('All .excalidraw files have been minified to public/drawings-json/.'); 