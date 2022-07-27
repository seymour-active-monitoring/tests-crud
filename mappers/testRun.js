const TestRun = require('../entities/TestRun');
const { entityToJsonAssertion } = require('./assertion');

const modelToEntityTestRun = (testRunData) => new TestRun({
  id: testRunData.run_id,
  testId: testRunData.test_id,
  success: testRunData.run_success,
  createdAt: testRunData.run_created_at,
  completedAt: testRunData.run_completed_at,
  regionName: testRunData.run_region_name,
  regionDisplayName: testRunData.run_region_display_name,
  regionFlagUrl: testRunData.run_region_flag_url,
  responseTime: testRunData.run_response_time,
  responseStatus: testRunData.run_response_status,
  responseBody: testRunData.run_response_body,
  responseHeaders: testRunData.run_response_headers,
});

const entityToJsonTestRun = (testRunEntity) => ({
  id: testRunEntity.id,
  testId: testRunEntity.testId,
  success: testRunEntity.success,
  createdAt: testRunEntity.createdAt,
  completedAt: testRunEntity.completedAt,
  regionName: testRunEntity.regionName,
  regionDisplayName: testRunEntity.regionDisplayName,
  regionFlagUrl: testRunEntity.regionFlagUrl,
  responseTime: testRunEntity.responseTime,
  responseStatus: testRunEntity.responseStatus,
  responseBody: testRunEntity.responseBody,
  responseHeaders: testRunEntity.responseHeaders,
  assertions: testRunEntity.assertions.map((assertion) => entityToJsonAssertion(assertion)),
});

module.exports = {
  modelToEntityTestRun,
  entityToJsonTestRun,
};
