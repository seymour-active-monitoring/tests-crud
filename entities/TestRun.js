class TestRun {
  constructor({
    id, testId, success, createdAt,
  }) {
    this.id = id;
    this.testId = testId;
    this.success = success;
    this.createdAt = createdAt;
  }
}

module.exports = TestRun;
