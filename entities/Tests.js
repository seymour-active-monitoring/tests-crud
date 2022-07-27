/* eslint-disable no-underscore-dangle */
class Tests {
  constructor() {
    this._tests = [];
  }

  containsTest(testId) {
    return this._tests.filter((test) => test.id === testId).length > 0;
  }

  addTest(test) {
    if (!this.containsTest(test.id)) {
      this._tests.push(test);
    }
  }

  getTest(testId) {
    return this._tests.filter((test) => test.id === testId)[0];
  }

  get tests() {
    return this._tests;
  }
}

module.exports = Tests;
