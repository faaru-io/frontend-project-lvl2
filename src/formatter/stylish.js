import _ from 'lodash';

const buildSpaces = (count) => ' '.repeat(count);

const myStringify = (node, level) => {
  if (!_.isObject(node)) {
    return node;
  }

  const entries = Object.entries(node);
  const spaces = buildSpaces(level * 2);
  const result = entries.map(([key, value]) => {
    const subNode = myStringify(value, level + 2);
    return `${spaces}    ${key}: ${subNode}`;
  }).flat();

  return ['{', ...result, `${spaces}}`].join('\n');
};

const mapState = {
  added: (key, value, spaces) => `${spaces}+ ${key}: ${value}`,
  deleted: (key, value, spaces) => `${spaces}- ${key}: ${value}`,
  unchanged: (key, value, spaces) => `${spaces}  ${key}: ${value}`,
};

const format = (tree) => {
  const iter = (nodes, level) => {
    const spaces = buildSpaces(level * 2);
    return nodes.flatMap((node) => {
      if (node.state === 'children') {
        return [`${spaces}  ${node.key}: {`, ...iter(node.value, level + 2), `${spaces}  }`];
      }

      if (node.state === 'changed') {
        return [
          mapState.deleted(node.key, myStringify(node.value.old, level + 1), spaces),
          mapState.added(node.key, myStringify(node.value.new, level + 1), spaces),
        ];
      }

      const formatState = mapState[node.state];
      return formatState(node.key, myStringify(node.value, level + 1), spaces);
    });
  };

  return ['{', ...iter(tree, 1), '}'].join('\n');
};

export default format;
