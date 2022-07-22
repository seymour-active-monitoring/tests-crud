/* eslint-disable no-param-reassign */
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

const formatAssertions = (assertionsArr) => {
  console.log('assertionsArr', assertionsArr);
  const headers = [];

  return assertionsArr.reduce((prev, curr) => {
    if (curr.type === 'headers') {
      headers.push({
        property: curr.property,
        target: curr.expected_value,
        comparison: curr.comparison,
      });
      prev[curr.type] = headers;
    } else {
      prev[curr.type] = {
        property: curr.property,
        target: curr.expected_value,
        comparison: curr.comparison,
      };
    }
    return prev;
  }, {});
};

module.exports.snakeToCamel = snakeToCamel;
module.exports.toCamelCase = toCamelCase;
module.exports.toDash = toDash;
module.exports.formatAssertions = formatAssertions;
