import { fileURLToPath } from 'url';
import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

/* eslint no-underscore-dangle: [2, { "allow": ["__filename", "__dirname"] }] */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedFormatter = {};

beforeAll(() => {
  expectedFormatter.stylish = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
  expectedFormatter.plain = fs.readFileSync(getFixturePath('result-plain.txt'), 'utf-8');
  expectedFormatter.json = fs.readFileSync(getFixturePath('result-json.txt'), 'utf-8');
});

test.each([
  ['json', 'json', 'stylish'],
  ['yml', 'yml', 'stylish'],
  ['ini', 'ini', 'stylish'],
  ['json', 'yml', 'stylish'],
  ['json', 'json', 'plain'],
  ['yml', 'yml', 'plain'],
  ['ini', 'ini', 'plain'],
  ['json', 'json', 'json'],
  ['ini', 'ini', 'json'],
  ['yml', 'yml', 'json'],
])('genDiff(file1: %s, file2: %s) to formatter "%s"', (format1, format2, formatter) => {
  const config1 = getFixturePath(`config1.${format1}`);
  const config2 = getFixturePath(`config2.${format2}`);
  expect(genDiff(config1, config2, formatter)).toEqual(expectedFormatter[formatter]);
});
