const express = require('express');
const testsController = require('../controllers/testsController');

const router = express.Router();

router.post('/tests', testsController.createTest);

module.exports = router;
