#!/usr/bin/env node

import commander from 'commander';
import fs from 'fs';
import _ from 'lodash';

const stateNew = '+';
const stateDeleted = '-';
const stateSame = ' ';

const program = commander.createCommand();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.2');

const createDiffRow = (fieldName, fieldValue) => {
  const { value, state } = fieldValue;
  return `  ${state} ${fieldName}: ${value}`;
};

const generateDiffResult = (diffMap) => {
  const rows = [];
  rows.push('{');
  Object.entries(diffMap).forEach((entry) => {
    const [key, values] = entry;
    const [value1, value2] = values;
    rows.push(createDiffRow(key, value1));
    if (value2) {
      rows.push(createDiffRow(key, value2));
    }
  });
  rows.push('}');

  return rows.join("\n");
};

const genDiff = (dataJson1, dataJson2) => {
  const result = Object.entries(dataJson1).reduce((acc, entry) => {
    const [key, value] = entry;
    acc[key] = [{ key, value, state: stateDeleted }];

    return acc;
  }, {});

  Object.entries(dataJson2).forEach((entry) => {
    const [key, value] = entry;
    if (!_.has(result, key)) {
      result[key] = [{ key, value, state: stateNew }];
    } else {
      const savedValue = result[key][0];
      result[key] = savedValue.value === value
        ? [{ ...savedValue, state: stateSame }]
        : [{ ...savedValue }, { key, value, state: stateNew }];
    }
  });

  const sortedResult = Object.keys(result)
    .sort()
    .reduce((acc, key) => ({
      ...acc, [key]: result[key],
    }), {});

  return generateDiffResult(sortedResult);
};

const loadFileContent = (filepath) => {
  if (!fs.existsSync(filepath)) {
    return null;
  }

  return fs.readFileSync(filepath, 'utf-8');
};

const convertToJson = (content) => {
  try {
    return JSON.parse(content);
  } catch (e) {
    return '{}';
  }
};

program
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const dataJson1 = convertToJson(loadFileContent(filepath1));
    const dataJson2 = convertToJson(loadFileContent(filepath2));
    const diff = genDiff(dataJson1, dataJson2);

    console.log(diff);
  });

program.parse(process.argv);

export default genDiff;
