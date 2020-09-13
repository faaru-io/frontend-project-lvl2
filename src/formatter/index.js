import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const index = {
  stylish: formatStylish,
  plain: formatPlain,
};

export default (format, astTree) => index[format](astTree);
