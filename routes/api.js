const express = require('express');
const testsController = require('../controllers/testsController');

const router = express.Router();

router.post('/tests', testsController.createTest);
router.get('/tests', testsController.getTests);

module.exports = router;
