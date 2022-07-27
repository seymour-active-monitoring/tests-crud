const TestRun = require('../../entities/TestRun');

const modelToEntityTestRun = (testRunData) => new TestRun({
  id: testRunData.run_id,
  testId: testRunData.test_id,
  success: testRunData.success,
  createdAt: testRunData.created_at,
});

const entityToJsonTestRun = (testRunEntity) => ({
  success: testRunEntity.success,
  createdAt: testRunEntity.createdAt,
});

module.exports = {
  modelToEntityTestRun,
  entityToJsonTestRun,
};