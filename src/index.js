import { extname } from 'path';
import fs from 'fs';
import buildAst from './ast-builder.js';
import getConfig from './parsers.js';
import format from './formatter/index.js';

const getFormat = (filepath) => {
  const fileFormat = extname(filepath);
  return fileFormat.slice(1);
};

const genDiff = (filepath1, filepath2, destFormat) => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const config1 = getConfig(format1, fs.readFileSync(filepath1, 'utf-8'));
  const config2 = getConfig(format2, fs.readFileSync(filepath2, 'utf-8'));

  const tree = buildAst(config1, config2);

  return format(destFormat, tree);
};

export default genDiff;
