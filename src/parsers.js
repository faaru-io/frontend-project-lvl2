import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  yml: yaml.safeLoad,
  ini: ini.parse,
  json: JSON.parse,
};

const getParser = (format) => _.get(parsers, format, parsers.json);

export default getParser;
