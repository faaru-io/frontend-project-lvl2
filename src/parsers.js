import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  yml: yaml.safeLoad,
  ini: ini.parse,
  json: JSON.parse,
};

export default (format, content) => parsers[format](content);
