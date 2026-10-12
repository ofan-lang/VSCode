'use strict';
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'syntaxes', 'ofan.tmLanguage.yaml');
const dst = path.join(__dirname, '..', 'syntaxes', 'ofan.tmLanguage.json');

const grammar = yaml.load(fs.readFileSync(src, 'utf8'));
fs.writeFileSync(dst, JSON.stringify(grammar, null, 2) + '\n');
console.log('Built syntaxes/ofan.tmLanguage.json');
