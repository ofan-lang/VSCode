'use strict';
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, '..', 'tests');

function findTests(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { recursive: true })
    .filter((f) => f.endsWith('.ofan'))
    .map((f) => path.join(dir, f));
}

const tests = findTests(testsDir);
if (tests.length === 0) {
  console.log('No grammar tests found — skipping.');
  process.exit(0);
}

const rel = tests.map((f) =>
  JSON.stringify(path.relative(process.cwd(), f).replace(/\\/g, '/')),
);
execSync(`vscode-tmgrammar-test ${rel.join(' ')}`, { stdio: 'inherit' });
