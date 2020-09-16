const replacer = (key, value) => {
  const numberValue = Number(value);
  if (!isNaN(Number(value)) && (typeof value !== 'boolean')) {
    return numberValue;
  }
  return value;
}

const format = (ast) => JSON.stringify(ast, replacer);

export default format;
