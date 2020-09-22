import yaml from 'js-yaml';
import ini from 'ini';

const isNumber = (value) => !Number.isNaN(Number(value));
const isBoolean = (value) => (
  value === false || value === true
);
const isString = (value) => (typeof value === 'string');

const normalizeIni = (content) => {
  const keys = Object.keys(content);
  return keys.reduce((acc, key) => {
    if (isBoolean(content[key])) {
      acc[key] = Boolean(content[key]);
    } else if (isNumber(content[key])) {
      acc[key] = Number(content[key]);
    } else if (isString(content[key])) {
      acc[key] = content[key];
    } else {
      acc[key] = normalizeIni(content[key]);
    }

    return acc;
  }, {});
};

const parseIni = (content) => normalizeIni(ini.parse(content));

const parsers = {
  yml: yaml.safeLoad,
  ini: parseIni,
  json: JSON.parse,
};

export default (format, content) => parsers[format](content);
