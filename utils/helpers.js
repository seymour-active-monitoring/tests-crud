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

const countAssertions = (runId, assertionResults) => {
  return assertionResults.filter((result) => result.test_run_id === runId).length;
};

const countAssertionPassed = (runId, assertionResults) => {
  return assertionResults.filter((result) => {
    return result.test_run_id === runId && result.pass === true;
  }).length;
};

const formatRuns = (runs, assertionResults) => {
  const testRuns = runs.map((run) => {
    return {
      id: run.test_run_id,
      location: run.display_name,
      success: run.pass,
      responseTimeMs: run.difference,
      assertions: countAssertions(run.test_run_id, assertionResults),
      assertionsPassed: countAssertionPassed(run.test_run_id, assertionResults),
      region: {
        id: run.region_id,
        flagUrl: run.flag_url,
      },
    };
  });

  return testRuns;
};

const comparisonTypeToId = (type) => {
  return {
    equalTo: 1,
    notEqualTo: 2,
    greaterThan: 3,
    lessThan: 4,
    greaterThanOrEqualTo: 5,
    lessThanOrEqualTo: 6,
    hasKey: 7,
    notHasKey: 8,
    hasValue: 9,
    notHasValue: 10,
    isEmpty: 11,
    isNotEmpty: 12,
    contains: 13,
    notContains: 14,
    isNull: 15,
    isNotNull: 16,
  }[type];
};

const comparisonIdToType = (id) => {
  return {
    1: 'equalTo',
    2: 'notEqualTo',
    3: 'greaterThan',
    4: 'lessThan',
    5: 'greaterThanOrEqualTo',
    6: 'lessThanOrEqualTo',
    7: 'hasKey',
    8: 'notHasKey',
    9: 'hasValue',
    10: 'notHasValue',
    11: 'isEmpty',
    12: 'isNotEmpty',
    13: 'contains',
    14: 'notContains',
    15: 'isNull',
    16: 'isNotNull',
  }[id];
};

module.exports.snakeToCamel = snakeToCamel;
module.exports.toCamelCase = toCamelCase;
module.exports.toDash = toDash;
module.exports.formatAssertions = formatAssertions;
module.exports.formatRuns = formatRuns;
module.exports.comparisonTypeToId = comparisonTypeToId;
module.exports.comparisonIdToType = comparisonIdToType;
