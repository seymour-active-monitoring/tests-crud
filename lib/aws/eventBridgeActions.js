const { PutRuleCommand, PutTargetsCommand } = require('@aws-sdk/client-eventbridge');
const { ebClient } = require('./eventBridgeClient');
const { lambdaClient, AddPermissionCommand } = require('./lambdaClient');

const eventBridgePutRule = async ({ name, minutesBetweenRuns }) => {
  const params = {
    Name: name,
    ScheduleExpression: String(minutesBetweenRuns) === '1' ? 'rate(1 minute)' : `rate(${minutesBetweenRuns} minutes)`,
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

const addLambdaPermissions = async ({ lambdaArn, ruleArn }) => {
  const ruleName = ruleArn.split('/').slice(-1)[0];

  const params = {
    Action: 'lambda:InvokeFunction',
    FunctionName: lambdaArn,
    Principal: 'events.amazonaws.com',
    StatementId: `preProcessor-home_${ruleName}`,
    SourceArn: ruleArn,
  };

  try {
    const data = await lambdaClient.send(new AddPermissionCommand(params));
    console.log('Success, lambda permissions added; requestID: ', data);
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
  eventBridgePutRule,
  addTargetLambda,
  addLambdaPermissions,
};
