import _ from 'lodash';

const buildSpaces = (count) => ' '.repeat(count * 2);

const myStringify = (node, level) => {
  if (!_.isObject(node)) {
    return node;
  }

  const entries = Object.entries(node);
  const spaces = buildSpaces(level);
  const result = entries.flatMap(([key, value]) => {
    const subNode = myStringify(value, level + 2);
    return [`${spaces}    ${key}: ${subNode}`];
  });

  return ['{', ...result, `${spaces}}`].join('\n');
};

const mapState = {
  added: (node, level) => {
    const spaces = buildSpaces(level);
    const value = myStringify(node.value, level + 1);
    return [`${spaces}+ ${node.key}: ${value}`];
  },
  deleted: (node, level) => {
    const spaces = buildSpaces(level);
    const value = myStringify(node.value, level + 1);
    return [`${spaces}- ${node.key}: ${value}`];
  },
  unchanged: (node, level) => {
    const spaces = buildSpaces(level);
    const value = myStringify(node.value, level + 1);
    return [`${spaces}  ${node.key}: ${value}`];
  },
  changed: (node, level) => {
    const spaces = buildSpaces(level);
    const oldValue = myStringify(node.value.old, level + 1);
    const newValue = myStringify(node.value.new, level + 1);
    return [
      `${spaces}- ${node.key}: ${oldValue}`,
      `${spaces}+ ${node.key}: ${newValue}`,
    ];
  },
  children: (node, level, cb) => {
    const spaces = buildSpaces(level);
    return [`${spaces}  ${node.key}: {`, ...cb(node.value, level + 2), `${spaces}  }`];
  },
};

const format = (ast) => {
  const iter = (nodes, level) => (
    nodes.flatMap((node) => mapState[node.type](node, level, iter))
  );

  return ['{', ...iter(ast, 1), '}'].join('\n');
};

export default format;
