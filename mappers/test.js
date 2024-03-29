const Test = require('../entities/Test');
const { entityToJsonTestRun } = require('./testRun');

const modelToEntityTest = (modelTestRow) => new Test({
  id: modelTestRow.test_id,
  name: modelTestRow.test_name,
  minutesBetweenRuns: modelTestRow.test_run_frequency_mins,
  method: modelTestRow.test_method,
  url: modelTestRow.test_url,
  createdAt: modelTestRow.test_created_at,
});

const entityToJsonTest = (entityTest) => ({
  id: entityTest.id,
  name: entityTest.name,
  minutesBetweenRuns: entityTest.minutesBetweenRuns,
  method: entityTest.method,
  createdAt: entityTest.createdAt,
  url: entityTest.url,
  runs: entityTest.runs.map((run) => entityToJsonTestRun(run)),
});

const entityToJsonTests = (entityTests) => {
  const r = entityTests.tests.map((test) => entityToJsonTest(test));
  return {
    tests: r,
  };
};

module.exports = {
  modelToEntityTest,
  entityToJsonTests,
  entityToJsonTest,
};
