const Test = require('../../entities/Test');
const { entityToJsonTestRun } = require('./testRun');

const modelToEntityTest = (modelTestRow) => new Test({
  id: modelTestRow.test_id,
  name: modelTestRow.test_name,
  minutesBetweenRuns: modelTestRow.test_run_frequency_mins,
  createdAt: modelTestRow.test_created_at,
});

const entityToJsonTest = (entityTest) => ({
  id: entityTest.id,
  name: entityTest.name,
  minutesBetweenRuns: entityTest.minutesBetweenRuns,
  createdAt: entityTest.createdAt,
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
};
