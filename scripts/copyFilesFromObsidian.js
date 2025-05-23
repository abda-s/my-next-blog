#!/usr/bin/env node
const fs   = require('fs');
const path = require('path');

// ─── CONFIG ────────────────────────────────────────────────────────────────
// Point this at the root of your Obsidian vault:
const vaultDir = path.resolve('C:/Users/3adas/OneDrive/Notes/posts');
// Where your blog expects its posts:
const postsDir = path.resolve(process.cwd(), 'posts');
// ────────────────────────────────────────────────────────────────────────────

const logger = {
  info:  msg => console.log(`[${new Date().toISOString()}] [INFO]  ${msg}`),
  warn:  msg => console.warn(`[${new Date().toISOString()}] [WARN]  ${msg}`),
  error: msg => console.error(`[${new Date().toISOString()}] [ERROR] ${msg}`)
};

/** Recursively collect all files under `dir` matching `filterFn` */
async function walk(dir, filterFn = () => true) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];
  for (let ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      files.push(...await walk(full, filterFn));
    } else if (ent.isFile() && filterFn(full)) {
      files.push(full);
    }
  }
  return files;
}

async function syncPosts() {
  logger.info(`Sync start: vault="${vaultDir}" → posts="${postsDir}"`);

  // 1) find all source .md files
  const sourceFiles = await walk(vaultDir, f => f.endsWith('.md'));
  logger.info(`Found ${sourceFiles.length} source markdown files.`);

  // build map of vault-relative → absolute source path
  const sourceMap = new Map();  // key = safeRelPath, value = absolute src path
  for (let src of sourceFiles) {
    const rel = path.relative(vaultDir, src)
      .split(path.sep).map(s => s.replace(/ /g, '-')).join(path.sep);
    sourceMap.set(rel, src);
  }

  // 2) copy new/updated
  let copied = 0;
  for (let [rel, src] of sourceMap) {
    const dest = path.join(postsDir, rel);
    const mustCopy = await (async () => {
      try {
        const [sStat, dStat] = await Promise.all([
          fs.promises.stat(src),
          fs.promises.stat(dest).catch(() => null)
        ]);
        // if no dest or source is newer
        return !dStat || sStat.mtimeMs > dStat.mtimeMs;
      } catch {
        return true;
      }
    })();

    if (mustCopy) {
      await fs.promises.mkdir(path.dirname(dest), { recursive: true });
      await fs.promises.copyFile(src, dest);
      logger.info(`Copied/Updated "${rel}"`);
      copied++;
    }
  }
  logger.info(`Copied/Updated: ${copied}/${sourceMap.size}`);

  // 3) delete stale files in postsDir
  const destFiles = await walk(postsDir, f => f.endsWith('.md'));
  let removed = 0;
  for (let full of destFiles) {
    const rel = path.relative(postsDir, full);
    if (!sourceMap.has(rel)) {
      await fs.promises.unlink(full);
      logger.warn(`Deleted stale file "${rel}"`);
      removed++;
    }
  }
  logger.info(`Deleted: ${removed}/${destFiles.length}`);

  logger.info('Sync complete.');
}

syncPosts().catch(err => {
  logger.error(`Fatal error: ${err.stack || err}`);
  process.exit(1);
});
