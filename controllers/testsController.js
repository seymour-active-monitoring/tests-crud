const { validationResult } = require('express-validator');
const { LOCATION_TO_PRE_PROCESSOR } = require('../constants/aws/locationMappings');
const { createRule, addTargetLambda, addLambdaPermissions } = require('../lib/aws/eventBridgeActions');
const { addNewTest, getTests, getTestDB } = require('../lib/db/query');

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
      lambdaArn: LOCATION_TO_PRE_PROCESSOR['pre-processing'].arn,
      lambdaName: LOCATION_TO_PRE_PROCESSOR['pre-processing'].title,
      inputJSON: JSON.stringify(reqBody),
    });

    permissionsResponse = await addLambdaPermissions({
      lambdaArn: LOCATION_TO_PRE_PROCESSOR['pre-processing'].arn,
      ruleArn: RuleArn,
    });

    try {
      await addNewTest(ruleName, RuleArn, test);
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
    const data = await getTests();
    res.json(data);
  } catch (err) {
    console.log('Error: ', err);
  }
};

const getTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const data = await getTestDB(testId);
    res.json(data);
  } catch (err) {
    console.log('Error: ', err);
  }
};

exports.createTest = createTest;
exports.getScheduledTests = getScheduledTests;
exports.getTest = getTest;
