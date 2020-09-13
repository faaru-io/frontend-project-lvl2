const format = (tree) => {
  const result = tree.reduce((acc, node) => {
    if (node.state === 'added') {
      acc.push(`  + ${node.key}: ${node.value}`);
    } else if (node.state === 'deleted') {
      acc.push(`  - ${node.key}: ${node.value}`);
    } else if (node.state === 'changed') {
      acc.push(`  - ${node.key}: ${node.value.old}`);
      acc.push(`  + ${node.key}: ${node.value.new}`);
    } else {
      acc.push(`    ${node.key}: ${node.value}`);
    }

    return acc;
  }, []);

  return ['{', ...result, '}'].join('\n');
};

export default format;
