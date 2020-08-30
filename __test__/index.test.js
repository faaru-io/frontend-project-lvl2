import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

/* eslint no-underscore-dangle: [2, { "allow": ["__filename", "__dirname"] }] */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff', () => {
  const config1 = getFixturePath('config1.json');
  const config2 = getFixturePath('config2.json');
  const expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

  expect(genDiff(config1, config2)).toEqual(expected);
});
