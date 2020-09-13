import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const index = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

export default (format, astTree) => index[format](astTree);
