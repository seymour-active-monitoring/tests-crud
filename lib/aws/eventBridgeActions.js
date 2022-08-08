const {
  PutRuleCommand,
  PutTargetsCommand,
  DeleteRuleCommand,
  RemoveTargetsCommand,
} = require('@aws-sdk/client-eventbridge');
const { ebClient } = require('./eventBridgeClient');

const putTestRule = async ({ name, minutesBetweenRuns }) => {
  const params = {
    Name: name,
    ScheduleExpression: String(minutesBetweenRuns) === '1' ? 'rate(1 minute)' : `rate(${minutesBetweenRuns} minutes)`,
    State: 'ENABLED',
  };

  try {
    const data = await ebClient.send(new PutRuleCommand(params));
    console.log('Success, scheduled rule created/ modified; Rule ARN:', data);
    return data; // For unit tests. (not important right now)
  } catch (err) {
    console.log('Error', err);
    return err;
  }
};

const addTargetLambda = async ({
  ruleName, lambdaArn, lambdaName, inputJSON,
}) => {
  const params = {
    Rule: ruleName,
    Targets: [
      {
        Arn: lambdaArn,
        Id: lambdaName,
        Input: inputJSON,
      },
    ],
  };
  console.log(params);

  try {
    const data = await ebClient.send(new PutTargetsCommand(params));
    console.log('Success, target added; requestID: ', data);
    return data; // For unit tests. (not important right now)
  } catch (err) {
    console.log('Error', err);
    return err;
  }
};

const removeTarget = async ({ lambdaName, testName }) => {
  const params = {
    Ids: [lambdaName],
    Rule: testName,
  };

  try {
    const data = await ebClient.send(new RemoveTargetsCommand(params));
    console.log('Success, target removed:', data);
    return data;
  } catch (err) {
    console.log('Error', err);
    return err;
  }
};

const removeRule = async (ruleName) => {
  const params = {
    Name: ruleName,
  };

  try {
    const data = await ebClient.send(new DeleteRuleCommand(params));
    console.log('Success, rule delete:', data);
    return data;
  } catch (err) {
    console.log('Error', err);
    return err;
  }
};

module.exports = {
  putTestRule,
  addTargetLambda,
  removeRule,
  removeTarget,
};
