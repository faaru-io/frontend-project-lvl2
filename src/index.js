import fs from 'fs';
import _ from 'lodash';

const parse = (key, config1, config2) => {
  const hasFirst = _.has(config1, key);
  const hasSecond = _.has(config2, key);

  if (hasFirst && !hasSecond) {
    return `  - ${key}: ${config1[key]}\n`;
  }

  if (!hasFirst && hasSecond) {
    return `  + ${key}: ${config2[key]}\n`;
  }

  if (config1[key] === config2[key]) {
    return `    ${key}: ${config1[key]}\n`;
  }

  return `  - ${key}: ${config1[key]}\n  + ${key}: ${config2[key]}\n`;
};

const genDiff = (filepath1, filepath2) => {
  const config1 = JSON.parse((fs.readFileSync(filepath1, 'utf-8')));
  const config2 = JSON.parse((fs.readFileSync(filepath2, 'utf-8')));

  const unionConfigKeys = _.union(Object.keys(config1), Object.keys(config2));
  const sortedKeys = unionConfigKeys.sort();

  const result = sortedKeys.map((key) => {
    return parse(key, config1, config2);
  });

  return `{\n` + result.join('') + `}`;
};

export default genDiff;
