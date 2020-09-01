import _ from 'lodash';

const buildAst = (config1, config2) => {
  const keysOfConfig1 = Object.keys(config1);
  const keysOfConfig2 = Object.keys(config2);
  const unionConfigKeys = _.union(keysOfConfig1, keysOfConfig2);
  const sortedUnionConfigKeys = unionConfigKeys.sort();

  return sortedUnionConfigKeys.map((key) => {
    const value1 = _.get(config1, key, null);
    const value2 = _.get(config2, key, null);

    let state;
    if (!_.has(config1, key)) {
      state = 'added';
    } else if (!_.has(config2, key)) {
      state = 'deleted';
    } else if (value1 !== value2) {
      state = 'changed';
    } else {
      state = 'unchanged';
    }

    return {
      key,
      value1,
      value2,
      state,
    };
  });
};

export default buildAst;
