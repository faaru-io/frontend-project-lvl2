import _ from 'lodash';

const createPropertyKey = (parent, key) => (
  parent !== '' ? `${parent}.${key}` : key
);

const convertValueToString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const mapState = {
  added: (parent, node) => (
    `Property '${createPropertyKey(parent, node.key)}' was added with value: ${convertValueToString(node.value)}`
  ),
  deleted: (parent, node) => (
    `Property '${createPropertyKey(parent, node.key)}' was removed`
  ),
  unchanged: () => {},
  changed: (parent, node) => {
    const valueOldString = convertValueToString(node.value.old);
    const valueNewString = convertValueToString(node.value.new);

    return `Property '${createPropertyKey(parent, node.key)}' was updated. From ${valueOldString} to ${valueNewString}`;
  },
};

const format = (tree) => {
  const iter = (nodes, parent) => {
    const result = nodes.map((node) => {
      if (node.state === 'children') {
        return iter(node.value, createPropertyKey(parent, node.key));
      }

      const formatState = mapState[node.state];
      return formatState(parent, node);
    });

    return result.flat();
  };

  return iter(tree, '')
    .filter((row) => row !== undefined)
    .join('\n');
};

export default format;
