const getAllTests = require('./getAllTests');
const getTestRuns = require('./getTestRuns');
const addNewTest = require('./addNewTest');
const addTestAssertions = require('./addTestAssertions');
const addTestAlerts = require('./addTestAlerts');
const editTest = require('./editTest');
const deactivateTestAssertions = require('./deactivateTestAssertions');
const deleteTestAlerts = require('./deleteTestAlerts');
const deleteTest = require('./deleteTest');
const getSideload = require('./getSideload');
const getTests = require('./getTests');
const getTestName = require('./getTestName');
const getTest = require('./getTest');
const getTestBody = require('./getTestBody');

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
  editTest,
  deactivateTestAssertions,
  deleteTestAlerts,
  deleteTest,
  getSideload,
  getTests,
  getTestName,
  getTest,
  getTestBody,
};
