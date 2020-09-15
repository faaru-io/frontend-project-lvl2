import _ from 'lodash';

const buildSpaces = (count) => ' '.repeat(count * 2);

const normalizeNodeValue = (node, level) => {
  if (!_.isObject(node)) {
    return node;
  }

  const entries = Object.entries(node);
  const spaces = buildSpaces(level);
  const result = entries.flatMap(([key, value]) => {
    const subNode = normalizeNodeValue(value, level + 2);
    return [`${spaces}    ${key}: ${subNode}`];
  });

  return ['{', ...result, `${spaces}}`].join('\n');
};

const generateKeyValueString = (key, value, sign, level) => {
  const spaces = buildSpaces(level);
  const normalizedValue = normalizeNodeValue(value, level + 1);
  return `${spaces}${sign} ${key}: ${normalizedValue}`;
};

const mapType = {
  added: (node, level) => (
    generateKeyValueString(node.key, node.value, '+', level)
  ),
  deleted: (node, level) => (
    generateKeyValueString(node.key, node.value, '-', level)
  ),
  unchanged: (node, level) => (
    generateKeyValueString(node.key, node.value, ' ', level)
  ),
  changed: (node, level) => (
    [
      generateKeyValueString(node.key, node.value.old, '-', level),
      generateKeyValueString(node.key, node.value.new, '+', level),
    ]
  ),
  children: (node, level, cb) => {
    const spaces = buildSpaces(level);
    return [`${spaces}  ${node.key}: {`, ...cb(node.value, level + 2), `${spaces}  }`];
  },
};

const format = (ast) => {
  const iter = (nodes, level) => (
    nodes.flatMap((node) => mapType[node.type](node, level, iter))
  );

  return ['{', ...iter(ast, 1), '}'].join('\n');
};

export default format;
