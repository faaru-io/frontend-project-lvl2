import _ from 'lodash';

const buildAst = (config1, config2) => {
  const keysOfConfig1 = Object.keys(config1);
  const keysOfConfig2 = Object.keys(config2);
  const unionConfigKeys = _.union(keysOfConfig1, keysOfConfig2);
  const sortedUnionConfigKeys = unionConfigKeys.sort();

  return sortedUnionConfigKeys.map((key) => {
    const value1 = config1[key];
    const value2 = config2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'children',
        value: buildAst(value1, value2),
      };
    }

    if (!_.has(config1, key)) {
      return { key, type: 'added', value: value2 };
    }

    if (!_.has(config2, key)) {
      return { key, type: 'deleted', value: value1 };
    }

    if (value1 !== value2) {
      return {
        key,
        type: 'changed',
        value: {
          old: value1,
          new: value2,
        },
      };
    }

    return { key, type: 'unchanged', value: value1 };
  });
};

export default buildAst;
