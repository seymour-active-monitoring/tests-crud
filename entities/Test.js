/* eslint-disable no-underscore-dangle */
class Test {
  constructor({
    id, name, minutesBetweenRuns, method, createdAt,
  }) {
    this._id = id;
    this._name = name;
    this._minutesBetweenRuns = minutesBetweenRuns;
    this._method = method;
    this._createdAt = createdAt;
    this._runs = [];
  }

  addRun(run) {
    this._runs.push(run);
  }

  get id() { return this._id; }

  get name() { return this._name; }

  get minutesBetweenRuns() { return this._minutesBetweenRuns; }

  get method() { return this._method; }

  get createdAt() { return this._createdAt; }

  get runs() { return this._runs; }
}

module.exports = Test;
