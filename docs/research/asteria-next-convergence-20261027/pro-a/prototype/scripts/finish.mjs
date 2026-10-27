import fs from 'node:fs/promises';
await fs.copyFile('dist/index.html','preview.html');
console.log('Self-contained preview.html created.');
