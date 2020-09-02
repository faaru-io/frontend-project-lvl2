import _ from 'lodash';

const isObjectOnly = (variable) => {
  return variable && typeof variable === 'object' && !Array.isArray(variable);
};

const buildAst = (config1, config2) => {
  const iter = (child1, child2, state = null) => {
    const keysOfConfig1 = Object.keys(child1);
    const keysOfConfig2 = Object.keys(child2);
    const unionConfigKeys = _.union(keysOfConfig1, keysOfConfig2);
    const sortedUnionConfigKeys = unionConfigKeys.sort();

    return sortedUnionConfigKeys.map((key) => {
      const value1 = _.get(child1, key, null);
      const value2 = _.get(child2, key, null);

      if (isObjectOnly(value1) && isObjectOnly(value2)) {
        const value = iter(value1, value2);
        return {
          key,
          value1: value,
          value2: value,
          state: 'unchanged',
        };
      }

      let state;
      if (isObjectOnly(value1) && isObjectOnly(value2) || value1 === value2) {
        state = 'unchanged';
      } else if (!_.has(child1, key)) {
        state = 'added';
      } else if (!_.has(child2, key)) {
        state = 'deleted';
      } else {
        state = 'changed';
      }

      return {
        key,
        value1: isObjectOnly(value1) ? iter(value1, value2) : value1,
        value2: isObjectOnly(value2) ? iter(value1, value2) : value2,
        state,
      };
    });
  };

  return iter(config1, config2, '');
};

export default buildAst;
