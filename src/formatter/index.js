import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatter = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

export default (format, astTree) => formatter[format](astTree);
