const getAllTests = require('./getAllTests');
const getTestRuns = require('./getTestRuns');
const addNewTest = require('./addNewTest');
const addTestAssertions = require('./addTestAssertions');
const addTestAlerts = require('./addTestAlerts');

// enables imports elsewhere under a common namespace
//
// e.g. if imported as `const queries = require('../lib/db/queries');`
// these functions can then be referred to by:
// * queries.getAllTests
// * queries.getTestRun
module.exports = {
  getAllTests,
  getTestRuns,
  addNewTest,
  addTestAssertions,
  addTestAlerts,
};
