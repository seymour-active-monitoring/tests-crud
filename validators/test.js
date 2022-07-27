const { check } = require('express-validator');

const MINIMUM_TITLE_LENGTH = 5;
const MAXIMUM_TITLE_LENGTH = 128;
const TITLE_REGEX = /^[.\-_A-Za-z0-9]+$/;
const TEST_TYPES = ['api'];
// TODO: pull from database?
const HTTP_METHODS = ['get', 'post', 'put', 'delete'];
// TODO: pull from database?
const AWS_LOCATIONS = ['us-east-1', 'us-west-1', 'eu-north-1', 'ca-central-1'];

// TODO: add validation for assertions
// TODO: add optional validation for headers
// TODO: add optional validation for request body
exports.validateTest = [
  check('test.title')
    .isString()
    .withMessage('must be a string')
    .isLength({ min: MINIMUM_TITLE_LENGTH })
    .withMessage(`must be at least ${MINIMUM_TITLE_LENGTH} characters long`)
    .isLength({ max: 128 })
    .withMessage(`must be at most ${MAXIMUM_TITLE_LENGTH} characters long`)
    .matches(TITLE_REGEX)
    .withMessage(`must satisfy regular expression pattern: ${TITLE_REGEX}`),
  check('test.locations')
    .isArray()
    .withMessage('must be an array'),
  check('test.locations.*')
    .isIn(AWS_LOCATIONS)
    .withMessage(`must be one of: ${AWS_LOCATIONS.join(', ')}`),
  check('test.minutesBetweenRuns')
    .isInt()
    .withMessage('must be an integer'),
  check('test.type')
    .isIn(TEST_TYPES)
    .withMessage(`must be one of: ${TEST_TYPES.join(', ')}`),
  check('test.httpRequest')
    .isObject()
    .withMessage('must be an object'),
  check('test.httpRequest.method')
    .isIn(HTTP_METHODS)
    .withMessage(`must be one of: ${HTTP_METHODS.join(', ')}`),
  check('test.httpRequest.url')
    .isURL()
    .withMessage('must be a valid url'),
  check('test.httpRequest.assertions')
    .isArray()
    .withMessage('must be an object'),
];
