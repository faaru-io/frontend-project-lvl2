import _ from 'lodash';
import { extname } from 'path';
import fs from 'fs';
import buildAst from './analyzer.js';
import getParser from './parsers.js';
import format from './formatter.js';

const getFormat = (filepath) => {
  const fileFormat = extname(filepath);

  return _.trimStart(fileFormat, '.');
};

const genDiff = (filepath1, filepath2) => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const parse1 = getParser(format1);
  const parse2 = getParser(format2);

  const config1 = parse1(fs.readFileSync(filepath1, 'utf-8'));
  const config2 = parse2(fs.readFileSync(filepath2, 'utf-8'));

  const tree = buildAst(config1, config2);
  return format(tree);
};

export default genDiff;
