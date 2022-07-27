/* eslint-disable no-underscore-dangle */
class Assertion {
  constructor({
    id, testRunId, type, property, comparison, expectedValue, actualValue, success,
  }) {
    this._id = id;
    this._testRunId = testRunId;
    this._type = type;
    this._property = property;
    this._comparison = comparison;
    this._expectedValue = expectedValue;
    this._actualValue = actualValue;
    this._success = success;
  }

  addRun(run) {
    this._runs.push(run);
  }

  get id() { return this._id; }

  get testRunId() { return this._testRunId; }

  get type() { return this._type; }

  get property() { return this._property; }

  get comparison() { return this._comparison; }

  get expectedValue() { return this._expectedValue; }

  get actualValue() { return this._actualValue; }

  get success() { return this._success; }
}

module.exports = Assertion;
