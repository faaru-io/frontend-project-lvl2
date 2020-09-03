import _ from 'lodash';

const buildAst = (config1, config2) => {
  const keysOfConfig1 = Object.keys(config1);
  const keysOfConfig2 = Object.keys(config2);
  const unionConfigKeys = _.union(keysOfConfig1, keysOfConfig2);
  const sortedUnionConfigKeys = unionConfigKeys.sort();

  return sortedUnionConfigKeys.map((key) => {
    const value1 = config1[key];
    const value2 = config2[key];

    if (!_.has(config1, key)) {
      return { key, state: 'added', value: value2 };
    }

    if (!_.has(config2, key)) {
      return { key, state: 'deleted', value: value1 };
    }

    if (value1 !== value2) {
      return {
        key,
        state: 'changed',
        value: {
          old: value1,
          new: value2,
        },
      };
    }

    return { key, state: 'unchanged', value: value1 };
  });
};

export default buildAst;
