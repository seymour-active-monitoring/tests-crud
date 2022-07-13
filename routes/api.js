const express = require('express');
const testsController = require('../controllers/testsController');

const router = express.Router();

router.post('/tests', testsController.createTest);
router.get('/tests', testsController.getScheduledTests);
router.get('/tests/results', testsController.getTestsResults);

module.exports = router;
