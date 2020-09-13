import stylishFormat from './formatter/stylish.js';

const formatters = {
  stylish: stylishFormat,
};

export default (format, astTree) => formatters[format](astTree);
