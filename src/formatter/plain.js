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

const createPropertyPath = (...properties) => properties.join('.');

const mapType = {
  added: (node, propertyKeys) => {
    const property = createPropertyPath(...propertyKeys, node.key);
    return `Property '${property}' was added with value: ${convertValueToString(node.value)}`;
  },
  deleted: (node, propertyKeys) => {
    const property = createPropertyPath(...propertyKeys, node.key);
    return `Property '${property}' was removed`;
  },
  unchanged: () => [],
  changed: (node, propertyKeys) => {
    const property = createPropertyPath(...propertyKeys, node.key);
    const valueOldString = convertValueToString(node.valueOld);
    const valueNewString = convertValueToString(node.valueNew);

    return `Property '${property}' was updated. From ${valueOldString} to ${valueNewString}`;
  },
  complex: (node, propertyKeys, iter) => iter(node.children, [...propertyKeys, node.key]),
};

const format = (ast) => {
  const iter = (nodes, parentKeys) => (
    nodes.flatMap((node) => mapType[node.type](node, parentKeys, iter))
  );

  return iter(ast, []).join('\n');
};

export default format;
