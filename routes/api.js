const express = require('express');
const testsController = require('../controllers/testsController');
const { validateTest } = require('../validators/test');

const router = express.Router();

router.post('/tests', validateTest, testsController.createTest);
router.get('/tests', testsController.getScheduledTests);
router.get('/tests/:id', testsController.getTest);

module.exports = router;
