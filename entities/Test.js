/* eslint-disable no-underscore-dangle */
class Test {
  constructor({
    id, name, minutesBetweenRuns, method, url, createdAt,
  }) {
    this._id = id;
    this._name = name;
    this._minutesBetweenRuns = minutesBetweenRuns;
    this._method = method;
    this._url = url;
    this._createdAt = createdAt;
    this._runs = [];
  }

  containsRun(runId) {
    return this._runs.filter((run) => run.id === runId).length > 0;
  }

  getRun(runId) {
    return this._runs.filter((run) => run.id === runId)[0];
  }

  addRun(run) {
    this._runs.push(run);
  }

  get id() { return this._id; }

  get name() { return this._name; }

  get minutesBetweenRuns() { return this._minutesBetweenRuns; }

  get method() { return this._method; }

  get url() { return this._url; }

  get createdAt() { return this._createdAt; }

  get runs() { return this._runs; }
}

module.exports = Test;
