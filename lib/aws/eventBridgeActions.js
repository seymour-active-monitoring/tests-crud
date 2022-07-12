const { PutRuleCommand, PutTargetsCommand } = require('@aws-sdk/client-eventbridge');
const { ebClient } = require('./eventBridgeClient');

const createRule = async ({ name, minutesBetweenRuns }) => {
  const params = {
    Name: name,
    ScheduleExpression: minutesBetweenRuns === 1 ? 'rate(1 minute)' : `rate(${minutesBetweenRuns} minutes)`,
    State: 'ENABLED',
  };

  try {
    const data = await ebClient.send(new PutRuleCommand(params));
    console.log('Success, scheduled rule created; Rule ARN:', data);
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

module.exports = {
  createRule,
  addTargetLambda,
};
