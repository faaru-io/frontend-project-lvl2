import fs from 'fs';
import _ from 'lodash';
import parse from './parser.js';

const render = (key, value, status) => `  ${status} ${key}: ${value}`;
const renderModifiedOption = (key, value1, value2) => {
  const deletedValue = render(key, value1, '-');
  const addedValue = render(key, value2, '+');

  return `${deletedValue}\n${addedValue}`;
};

const genDiff = (filepath1, filepath2) => {
  const config1 = JSON.parse((fs.readFileSync(filepath1, 'utf-8')));
  const config2 = JSON.parse((fs.readFileSync(filepath2, 'utf-8')));

  const unionConfigKeys = _.union(Object.keys(config1), Object.keys(config2));
  const sortedKeys = unionConfigKeys.sort();

  const result = sortedKeys.map((key) => {
    const status = parse(key, config1, config2);
    switch (status) {
      case 'deleted':
        return render(key, config1[key], '-');
      case 'added':
        return render(key, config2[key], '+');
      case 'modified':
        return renderModifiedOption(key, config1[key], config2[key]);
      case 'unmodified':
      default:
        return render(key, config2[key], ' ');
    }
  });

  return ['{', ...result, '}'].join('\n');
};

export default genDiff;
