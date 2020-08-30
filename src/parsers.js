import { extname } from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const getData = (filepath) => {
  const fileFormat = extname(filepath);
  const content = fs.readFileSync(filepath, 'utf-8');

  let parser;
  switch (fileFormat) {
    case '.yml':
      parser = yaml.safeLoad;
      break;
    case '.json':
    default:
      parser = JSON.parse;
  }

  return parser(content);
};

export default getData;
