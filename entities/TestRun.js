/* eslint-disable no-underscore-dangle */
class TestRun {
  constructor({
    id,
    testId,
    success,
    regionName,
    regionDisplayName,
    regionFlagUrl,
    responseTime,
    responseStatus,
    responseBody,
    responseHeaders,
    createdAt,
    completedAt,
  }) {
    this._id = id;
    this._testId = testId;
    this._success = success;
    this._regionName = regionName;
    this._regionDisplayName = regionDisplayName;
    this._regionFlagUrl = regionFlagUrl;
    this._responseTime = responseTime;
    this._responseStatus = responseStatus;
    this._responseBody = responseBody;
    this._responseHeaders = responseHeaders;
    this._assertions = [];
    this._createdAt = createdAt;
    this._completedAt = completedAt;
  }

  containsAssertion(assertionId) {
    return this._assertions.filter((assertion) => assertion.id === assertionId).length > 0;
  }

  addAssertion(assertion) {
    this._assertions.push(assertion);
  }

  get id() { return this._id; }

  get testId() { return this._testId; }

  get success() { return this._success; }

  get createdAt() { return this._createdAt; }

  get completedAt() { return this._completedAt; }

  get regionName() { return this._regionName; }

  get regionDisplayName() { return this._regionDisplayName; }

  get regionFlagUrl() { return this._regionFlagUrl; }

  get responseTime() { return this._responseTime; }

  get responseStatus() { return this._responseStatus; }

  get responseBody() { return this._responseBody; }

  get responseHeaders() { return this._responseHeaders; }

  get assertions() { return this._assertions; }
}

module.exports = TestRun;
