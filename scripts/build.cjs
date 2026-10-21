const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
// The only deletion is the generated build directory inside this project.
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Invalid build destination');
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
fs.cpSync(path.join(root, 'src'), output, { recursive: true });
fs.cpSync(path.join(root, 'public'), output, { recursive: true });
console.log('Built dist/ from src/ and public/. Upload dist/ to a static host.');
