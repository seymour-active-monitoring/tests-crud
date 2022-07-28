const express = require('express');
const testsController = require('../controllers/testsController');
const sideloadController = require('../controllers/sideloadController');
const { validateTest } = require('../validators/test');

const router = express.Router();

router.post('/tests', validateTest, testsController.createTest);
// router.get('/tests', testsController.getScheduledTests);
router.get('/tests', testsController.getTests);
router.get('/tests/:id', testsController.getTest);
router.get('/sideload', sideloadController.getSideload);
router.get('/tests/:testId/runs/:runId', testsController.getTestRun);
router.post('/tests/:id/run', testsController.runNow);
router.get('/tests/:id/runs', testsController.getTestRuns);
router.put('/tests/:id', testsController);

module.exports = router;
