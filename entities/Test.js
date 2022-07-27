class Test {
  constructor({
    id, name, minutesBetweenRuns, method, createdAt,
  }) {
    this.id = id;
    this.name = name;
    this.minutesBetweenRuns = minutesBetweenRuns;
    this.method = method;
    this.createdAt = createdAt;
    this.runs = [];
  }

  addRun(run) {
    this.runs.push(run);
  }
}

module.exports = Test;
