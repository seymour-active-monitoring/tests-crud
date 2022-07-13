const { LOCATION_TO_TEST_RUNNER } = require('../constants/aws/locationMappings');
const { createRule, addTargetLambda } = require('../lib/aws/eventBridgeActions');
const { addNewTest, getTestResults } = require('../lib/db/query');

const createEventBridgeRule = async (test) => {
  let targetResponse;
  try {
    const { RuleArn } = await createRule({
      name: `${test.title}-test`,
      minutesBetweenRuns: test.minutesBetweenRuns,
    });
    const ruleName = RuleArn.split('/').slice(-1)[0];

    targetResponse = await addTargetLambda({
      ruleName,
      lambdaArn: LOCATION_TO_TEST_RUNNER['pre-processing'].arn,
      lambdaName: LOCATION_TO_TEST_RUNNER['pre-processing'].title,
      inputJSON: JSON.stringify(test.httpRequest),
    });

    try {
      await addNewTest(ruleName, test);
    } catch (e) {
      throw new Error('Something went wrong with the database operation. Please try again');
    }
  } catch (err) {
    console.log('Error: ', err);
    return err;
  }
  return targetResponse;
};

const createTest = async (req, res) => {
  try {
    const { test } = req.body;
    createEventBridgeRule(test);
    res.status(201).send(`Test ${test.title} created`);
  } catch (err) {
    console.log('Error: ', err);
  }
};

const getTests = async (req, res) => {
  try {
    let data = await getTestResults();
    res.json(data);
  } catch (err) {
    console.log('Error: ', err);
  }
}

exports.createTest = createTest;
exports.getTests = getTests;
