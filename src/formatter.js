const format = (tree) => {
  const result = tree.reduce((acc, node) => {
    if (node.state === 'added') {
      acc.push(`  + ${node.key}: ${node.value2}`);
    } else if (node.state === 'deleted') {
      acc.push(`  - ${node.key}: ${node.value1}`);
    } else if (node.state === 'changed') {
      acc.push(`  - ${node.key}: ${node.value1}`);
      acc.push(`  + ${node.key}: ${node.value2}`);
    } else {
      acc.push(`    ${node.key}: ${node.value1}`);
    }

    return acc;
  }, []);

  return ['{', ...result, '}'].join('\n');
};

export default format;
