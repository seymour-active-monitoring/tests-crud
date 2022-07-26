const axios = require('axios');
const { validationResult } = require('express-validator');
const { RULE_TARGET_INFO } = require('../constants/aws/locationMappings');
const { createRule, addTargetLambda, addLambdaPermissions } = require('../lib/aws/eventBridgeActions');
const DB = require('../lib/db/query');

const createEventBridgeRule = async (reqBody) => {
  const { test } = reqBody;
  let targetResponse;
  let permissionsResponse;
  try {
    const { RuleArn } = await createRule({
      name: `${test.title}`,
      minutesBetweenRuns: test.minutesBetweenRuns,
    });
    const ruleName = RuleArn.split('/').slice(-1)[0];

    targetResponse = await addTargetLambda({
      ruleName,
      lambdaArn: RULE_TARGET_INFO['test-route-packager'].arn,
      lambdaName: RULE_TARGET_INFO['test-route-packager'].title,
      inputJSON: JSON.stringify(reqBody),
    });

    permissionsResponse = await addLambdaPermissions({
      lambdaArn: RULE_TARGET_INFO['test-route-packager'].arn,
      ruleArn: RuleArn,
    });

    try {
      await DB.addNewTest(ruleName, RuleArn, test);
    } catch (e) {
      throw new Error('Something went wrong with the database operation. Please try again');
    }
  } catch (err) {
    console.log('Error: ', err);
    return err;
  }
  return { targetResponse, permissionsResponse };
};

const createTest = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      createEventBridgeRule(req.body);
      res.status(201).send(`Test ${req.body.test.title} created`);
    } catch (err) {
      console.log('Error: ', err);
    }
  } else {
    res.status(400).json({ errors: errors.array() });
  }
};

const getScheduledTests = async (req, res) => {
  try {
    const data = await DB.getTests();
    res.json(data);
  } catch (err) {
    console.log('Error: ', err);
  }
};

const getTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const data = await DB.getTest(testId);
    res.json(data);
  } catch (err) {
    console.log('Error: ', err);
  }
};

const runNow = async (req, res) => {
  try {
    const testId = req.params.id;
    // this url will need to come from a config file
    const lambdaURL = 'https://x3a5z6dcrihrt5dzirl3c6lube0wrlys.lambda-url.us-east-1.on.aws/';
    const data = await DB.getTestBody(testId);
    axios.post(lambdaURL, data);
    res.status(200).send('OK');
  } catch (err) {
    console.log('Error: ', err);
  }
};

const getTestRuns = async (req, res) => {
  try {
    const testId = req.params.id;
    const data = await DB.getTestsRuns(testId);
    res.status(200).json(data);
  } catch (err) {
    console.log('Error: ', err);
  }
};

exports.runNow = runNow;
exports.createTest = createTest;
exports.getScheduledTests = getScheduledTests;
exports.getTest = getTest;
exports.getTestRuns = getTestRuns;
