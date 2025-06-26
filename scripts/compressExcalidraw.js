const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const projectRoot = path.resolve(__dirname, '..');
const drawingsDir = path.join(projectRoot, 'drawings'); // Now at root
const compressedRoot = path.join(projectRoot, 'public/drawing-compressed');

function rel(p) {
  return path.relative(projectRoot, p);
}

// Cleanup: Remove .br files/folders in compressedRoot that don't exist in drawingsDir
function cleanupCompressed(srcDrawings, srcCompressed) {
  if (!fs.existsSync(srcCompressed)) return;
  fs.readdirSync(srcCompressed, { withFileTypes: true }).forEach(dirent => {
    const compPath = path.join(srcCompressed, dirent.name);
    const drawPath = path.join(srcDrawings, dirent.name.replace(/\.excalidraw\.br$/, '.excalidraw'));
    if (dirent.isDirectory()) {
      const correspondingDrawingsDir = path.join(srcDrawings, dirent.name);
      if (!fs.existsSync(correspondingDrawingsDir)) {
        fs.rmSync(compPath, { recursive: true, force: true });
        console.log(`Deleted folder: ${rel(compPath)}`);
      } else {
        cleanupCompressed(correspondingDrawingsDir, compPath);
        // Remove empty folders
        if (fs.readdirSync(compPath).length === 0) {
          fs.rmdirSync(compPath);
          console.log(`Deleted empty folder: ${rel(compPath)}`);
        }
      }
    } else if (dirent.isFile() && dirent.name.endsWith('.excalidraw.br')) {
      const correspondingDrawing = path.join(srcDrawings, dirent.name.replace(/\.br$/, ''));
      if (!fs.existsSync(correspondingDrawing)) {
        fs.unlinkSync(compPath);
        console.log(`Deleted file: ${rel(compPath)}`);
      }
    }
  });
}

console.log('--- Cleaning up drawing-compressed ---');
cleanupCompressed(drawingsDir, compressedRoot);

// Recursively create folder structure in drawing-compressed
function copyFoldersOnly(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
    console.log(`Created folder: ${rel(dest)}`);
  }
  fs.readdirSync(src, { withFileTypes: true }).forEach(dirent => {
    if (dirent.isDirectory()) {
      const srcSub = path.join(src, dirent.name);
      const destSub = path.join(dest, dirent.name);
      if (!fs.existsSync(destSub)) {
        fs.mkdirSync(destSub);
        console.log(`Created folder: ${rel(destSub)}`);
      }
      copyFoldersOnly(srcSub, destSub);
    }
  });
}

console.log('--- Copying folder structure ---');
copyFoldersOnly(drawingsDir, compressedRoot);

// Recursively process .excalidraw files
function processFiles(src, dest) {
  fs.readdirSync(src, { withFileTypes: true }).forEach(dirent => {
    const srcPath = path.join(src, dirent.name);
    const destPath = path.join(dest, dirent.name + '.br');
    if (dirent.isDirectory()) {
      processFiles(srcPath, path.join(dest, dirent.name));
    } else if (dirent.isFile() && dirent.name.endsWith('.excalidraw')) {
      if (fs.existsSync(destPath)) {
        console.log(`SKIP: Already compressed: ${rel(destPath)}`);
        return;
      }
      try {
        console.log(`Compressing: ${rel(srcPath)}`);
        const raw = fs.readFileSync(srcPath, 'utf8');
        const data = JSON.parse(raw);
        const minified = JSON.stringify(data);
        const brotli = zlib.brotliCompressSync(Buffer.from(minified, 'utf8'));
        fs.writeFileSync(destPath, brotli);
        console.log(`SUCCESS: Compressed ${rel(srcPath)} -> ${rel(destPath)}`);
      } catch (e) {
        console.error(`ERROR: Failed to compress ${rel(srcPath)}:`, e);
      }
    }
  });
}

console.log('--- Compressing .excalidraw files ---');
processFiles(drawingsDir, compressedRoot);
console.log('--- Done ---'); 