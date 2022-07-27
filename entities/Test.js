class Test {
  constructor({
    id, name, minutesBetweenRuns, createdAt,
  }) {
    this.id = id;
    this.name = name;
    this.minutesBetweenRuns = minutesBetweenRuns;
    this.createdAt = createdAt;
    this.runs = [];
  }

  addRun(run) {
    this.runs.push(run);
  }
}

module.exports = Test;
