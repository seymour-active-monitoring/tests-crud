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

module.exports.snakeToCamel = snakeToCamel;
module.exports.toCamelCase = toCamelCase;
module.exports.toDash = toDash;
module.exports.formatAssertions = formatAssertions;
module.exports.formatRuns = formatRuns;
