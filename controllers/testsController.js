const { LOCATION_TO_TEST_RUNNER } = require('../constants/aws/locationMappings');
const { createRule, addTargetLambda } = require('../lib/aws/eventBridgeActions');

const createEventBridgeRule = async (location, test) => {
  try {
    const { RuleArn } = await createRule({
      name: `${test.title}-${location}`,
      minutesBetweenRuns: test.minutesBetweenRuns,
    });
    const ruleName = RuleArn.split('/').slice(-1)[0];

    const targetResponse = await addTargetLambda({
      ruleName,
      lambdaArn: LOCATION_TO_TEST_RUNNER[location].arn,
      lambdaName: LOCATION_TO_TEST_RUNNER[location].title,
      inputJSON: JSON.stringify(test.http_request),
    });

    return targetResponse;
  } catch (err) {
    console.log('Error: ', err);
    return err;
  }
};

const createTest = async (req, res) => {
  try {
    const { test } = req.body;
    test.locations.forEach((location) => {
      createEventBridgeRule(location, test);
    });
    res.status(201).send(`Test ${test.title} created`);
  } catch (err) {
    console.log('Error: ', err);
  }
};

exports.createTest = createTest;
