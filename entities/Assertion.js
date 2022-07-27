class Assertion {
  constructor({
    id, testRunId, type, property, comparison, expectedValue, actualValue, success,
  }) {
    this.id = id;
    this.testRunId = testRunId;
    this.type = type;
    this.property = property;
    this.comparison = comparison;
    this.expectedValue = expectedValue;
    this.actualValue = actualValue;
    this.success = success;
  }

  addRun(run) {
    this.runs.push(run);
  }
}

module.exports = Assertion;
