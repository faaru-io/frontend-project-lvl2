import _ from 'lodash';

const buildAst = (config1, config2) => {
  const keysOfConfig1 = Object.keys(config1);
  const keysOfConfig2 = Object.keys(config2);
  const unionConfigKeys = _.union(keysOfConfig1, keysOfConfig2);
  const sortedUnionConfigKeys = unionConfigKeys.sort();

  return sortedUnionConfigKeys.map((key) => {
    if (!_.has(config1, key)) {
      return { key, type: 'added', value: config2[key] };
    }
    if (!_.has(config2, key)) {
      return { key, type: 'deleted', value: config1[key] };
    }
    if (_.isPlainObject(config1[key]) && _.isPlainObject(config2[key])) {
      return { key, type: 'complex', children: buildAst(config1[key], config2[key]) };
    }

    return config1[key] === config2[key]
      ? { key, type: 'unchanged', value: config1[key] }
      : {
        key,
        type: 'changed',
        valueOld: config1[key],
        valueNew: config2[key],
      };
  });
};

export default buildAst;
