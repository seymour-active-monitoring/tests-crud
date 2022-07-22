const express = require('express');
const testsController = require('../controllers/testsController');
const sideloadController = require('../controllers/sideloadController');
const { validateTest } = require('../validators/test');

const router = express.Router();

router.post('/tests', validateTest, testsController.createTest);
router.get('/tests', testsController.getScheduledTests);
router.get('/tests/:id', testsController.getTest);
router.get('/sideload', sideloadController.getSideload);
router.get('/tests/run/:id', testsController.runNow);

module.exports = router;
