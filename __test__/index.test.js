import { fileURLToPath } from 'url';
import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

/* eslint no-underscore-dangle: [2, { "allow": ["__filename", "__dirname"] }] */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let expected;

beforeAll(() => {
  expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
});

test('genDiff json', () => {
  const config1 = getFixturePath('config1.json');
  const config2 = getFixturePath('config2.json');

  expect(genDiff(config1, config2, 'stylish')).toEqual(expected);
});

test('genDiff yaml', () => {
  const config1 = getFixturePath('config1.yml');
  const config2 = getFixturePath('config2.yml');

  expect(genDiff(config1, config2, 'stylish')).toEqual(expected);
});

test('genDiff mix json yaml', () => {
  const config1 = getFixturePath('config1.json');
  const config2 = getFixturePath('config2.yml');

  expect(genDiff(config1, config2, 'stylish')).toEqual(expected);
});

test('genDiff ini', () => {
  const config1 = getFixturePath('config1.ini');
  const config2 = getFixturePath('config2.ini');

  expect(genDiff(config1, config2, 'stylish')).toEqual(expected);
});
