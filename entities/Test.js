class Test {
  constructor({ id, name, minutesBetweenRuns }) {
    this.id = id;
    this.name = name;
    this.minutesBetweenRuns = minutesBetweenRuns;
    this.runs = [];
  }

  addRun(run) {
    this.runs.push(run);
  }
}

module.exports = Test;
