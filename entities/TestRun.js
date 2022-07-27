/* eslint-disable no-underscore-dangle */
class TestRun {
  constructor({
    id,
    testId,
    success,
    createdAt,
    completedAt,
    regionName,
    regionDisplayName,
    regionFlagUrl,
    responseTime,
    responseStatus,
    responseBody,
    responseHeaders,
  }) {
    this.id = id;
    this.testId = testId;
    this.success = success;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.regionName = regionName;
    this.regionDisplayName = regionDisplayName;
    this.regionFlagUrl = regionFlagUrl;
    this.responseTime = responseTime;
    this.responseStatus = responseStatus;
    this.responseBody = responseBody;
    this.responseHeaders = responseHeaders;
    this._assertions = [];
  }

  addAssertion(assertion) {
    this._assertions.push(assertion);
  }

  get assertions() {
    return this._assertions;
  }
}

module.exports = TestRun;
