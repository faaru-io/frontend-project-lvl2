const convertValueToString = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const mapType = {
  added: (node, propertyKeys) => {
    const property = [...propertyKeys, node.key].join('.');
    return [`Property '${property}' was added with value: ${convertValueToString(node.value)}`];
  },
  deleted: (node, propertyKeys) => {
    const property = [...propertyKeys, node.key].join('.');
    return [`Property '${property}' was removed`];
  },
  unchanged: () => [],
  changed: (node, propertyKeys) => {
    const property = [...propertyKeys, node.key].join('.');
    const valueOldString = convertValueToString(node.value.old);
    const valueNewString = convertValueToString(node.value.new);

    return [`Property '${property}' was updated. From ${valueOldString} to ${valueNewString}`];
  },
  children: (node, propertyKeys, cb) => cb(node.value, [...propertyKeys, node.key]),
};

const format = (ast) => {
  const iter = (nodes, parentKeys) => (
    nodes.flatMap((node) => mapType[node.type](node, parentKeys, iter))
  );

  return iter(ast, []).join('\n');
};

export default format;
