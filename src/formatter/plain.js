const convertValueToString = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    case 'boolean':
    case 'number':
    default:
      return value;
  }
};

const format = (tree) => {
  const mapState = {
    added: (propertyKeys, node) => (
      [`Property '${propertyKeys.join('.')}' was added with value: ${convertValueToString(node.value)}`]
    ),
    deleted: (propertyKeys) => [`Property '${propertyKeys.join('.')}' was removed`],
    unchanged: () => [],
    changed: (propertyKeys, node) => {
      const property = propertyKeys.join('.');
      const valueOldString = convertValueToString(node.value.old);
      const valueNewString = convertValueToString(node.value.new);

      return [`Property '${property}' was updated. From ${valueOldString} to ${valueNewString}`];
    },
    children: (propertyKeys, node) => iter(node.value, propertyKeys),
  };

  const iter = (nodes, parentKeys) => (
    nodes.flatMap((node) => mapState[node.state]([...parentKeys, node.key], node))
  );

  return iter(tree, []).join('\n');
};

export default format;
