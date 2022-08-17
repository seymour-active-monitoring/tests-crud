const express = require('express');
const testsController = require('../controllers/testsController');
const sideloadController = require('../controllers/sideloadController');
const { validateTest } = require('../validators/test');

const router = express.Router();

router.post('/tests', validateTest, testsController.createTest);
router.post('/tests/:id/run', testsController.runNow);
router.put('/tests/:id', validateTest, testsController.editTest);
router.delete('/tests/:id', testsController.deleteTest);
router.get('/tests', testsController.getTests);
router.get('/tests/:id', testsController.getTest);
router.get('/tests/:id/runs', testsController.getTestRuns);
router.get('/tests/:testId/runs/:runId', testsController.getTestRun);
router.get('/sideload', sideloadController.getSideload);

module.exports = router;
