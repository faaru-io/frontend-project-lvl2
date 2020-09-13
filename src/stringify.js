#!/usr/bin/env node

import _ from 'lodash';
import fs from 'fs';
import getConfig from './parsers.js';

const json = fs.readFileSync('/Users/aschweizer/faaru/hexlet.io/frontend-project-lvl2/__fixtures__/config2.json', 'utf-8');

const myStringify = (tree, level) => {
  const keys = Object.keys(tree);
  const spaces = ' '.repeat(level * 2);

  const result = keys.reduce((acc, key) => {
    const value = tree[key];
    if (!_.isObject(value)) {
      return [...acc, `${spaces}${key}: ${value}`];
    }
    return [...acc, `${spaces}${key}: {`, myStringify(value, level + 1), `${spaces}}`];
  }, []);

  return result.flat();
};

const config = getConfig('json', json);
console.log(Object.entries(config));
const rendered = myStringify(config, 1);
console.log(rendered.join('\n'));
