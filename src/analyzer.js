import _ from 'lodash';

const analyze = (key, config1, config2) => {
  const hasFirst = _.has(config1, key);
  const hasSecond = _.has(config2, key);

  if (hasFirst && !hasSecond) {
    return 'deleted';
  }
  if (!hasFirst && hasSecond) {
    return 'added';
  }
  if (config1[key] !== config2[key]) {
    return 'modified';
  }

  return 'unmodified';
};

export default analyze;
