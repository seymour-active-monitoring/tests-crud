/* eslint-disable arrow-body-style */
const snakeToCamel = (str) => {
  return str.toLowerCase().replace(/([-_][a-z])/g, (group) => {
    return group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

const toCamelCase = (data, prop) => {
  return data.map((item) => {
    return { ...item, [prop]: snakeToCamel(item[prop]) };
  });
};

const toDash = (str) => {
  const RE = /_/g;
  return str.replace(RE, '-');
};

module.exports.snakeToCamel = snakeToCamel;
module.exports.toCamelCase = toCamelCase;
module.exports.toDash = toDash;