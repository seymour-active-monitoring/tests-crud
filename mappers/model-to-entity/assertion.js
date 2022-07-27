const Assertion = require('../../entities/Assertion');

const modelToEntityAssertion = (modelAssertionRow) => new Assertion({
  id: modelAssertionRow.assertion_id,
  testRunId: modelAssertionRow.run_id,
  type: modelAssertionRow.assertion_type,
  property: modelAssertionRow.assertion_property,
  comparison: modelAssertionRow.assertion_comparison,
  expectedValue: modelAssertionRow.assertion_expected_value,
  actualValue: modelAssertionRow.assertion_actual_value,
  success: modelAssertionRow.assertion_success,
});

const entityToJsonAssertion = (assertion) => ({
  type: assertion.type,
  property: assertion.property,
  comparison: assertion.comparison,
  expectedValue: assertion.expectedValue,
  actualValue: assertion.actualValue,
  success: assertion.success,
});

module.exports = {
  modelToEntityAssertion,
  entityToJsonAssertion,
};
