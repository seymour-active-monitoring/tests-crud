const express = require('express');
const testsController = require('../controllers/testsController');
const sideloadController = require('../controllers/sideloadController');
const { validateTest } = require('../validators/test');

const router = express.Router();

router.post('/tests', validateTest, testsController.createTest);
router.get('/tests', testsController.getScheduledTests);
router.get('/tests/:id', testsController.getTest);
router.get('/sideload', sideloadController.getSideload);
router.post('/tests/:id/run', testsController.runNow);
router.get('/tests/:id/runs', testsController.getTestRuns);

module.exports = router;
