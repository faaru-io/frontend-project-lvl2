const isNumber = (value) => !Number.isNaN(Number(value));

const replacer = (key, value) => {
  if (isNumber(value) && (typeof value !== 'boolean')) {
    return Number(value);
  }
  return value;
};

const format = (ast) => JSON.stringify(ast, replacer);

export default format;
