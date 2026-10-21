const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'src/index.html'), 'utf8');
const references = new Set([...html.matchAll(/(?:src|href)=["'](\/(?!\/)[^"'#?]+)/g)].map(match => match[1]));
for (const reference of references) {
  const file = path.join(root, reference.startsWith('/assets/') ? 'public' : 'src', reference);
  if (!fs.existsSync(file)) throw new Error(`Missing local file: ${reference}`);
}
for (const filename of fs.readdirSync(path.join(root, 'src/scripts'))) {
  if (filename.endsWith('.js')) new vm.Script(fs.readFileSync(path.join(root, 'src/scripts', filename), 'utf8'), { filename });
}
console.log(`Checked ${references.size} local HTML references and all source JavaScript syntax.`);
