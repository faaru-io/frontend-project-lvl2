import { extname } from 'path';
import fs from 'fs';
import buildAst from './astBuilder.js';
import getConfig from './parsers.js';
import format from './formatter/index.js';

const getFormat = (filepath) => extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, destFormat) => {
  const config1 = getConfig(getFormat(filepath1), fs.readFileSync(filepath1, 'utf-8'));
  const config2 = getConfig(getFormat(filepath2), fs.readFileSync(filepath2, 'utf-8'));

  const ast = buildAst(config1, config2);

  return format(destFormat, ast);
};

export default genDiff;
