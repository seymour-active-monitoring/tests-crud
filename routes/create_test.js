const Router = require('express');
const router = new Router();
const { PutRuleCommand, PutTargetsCommand, PutEventsCommand } = require("@aws-sdk/client-eventbridge");
const { createRule, addTargetLambda } = require('../lib/aws/event_bridge_actions');

const RULE_NAME = `TEST_RULE_CREATED_AT_${Date.now()}`
const LAMBDA_ARN = 'arn:aws:lambda:us-east-1:082057163641:function:testRunnerV0';
const LAMBDA_NAME = 'testRunnerV0';
const INPUT_JSON = JSON.stringify({
  "http_method": "GET",
  "url": "https://trellific.corkboard.dev/api/boards/62a9fbf7b9e7dbb1bddb0fe2",
  "assertions": {
    "status_code": 200,
    "contains_properties": [
      "title",
      "doesNotExist"
    ],
    "assertionDoesNotExist": "test"
  }
})

router.post('/api/test', async (req, res) => {
  const { RuleArn } = await createRule(RULE_NAME, 1);
  const ruleName = RuleArn.split('/').slice(-1)[0];
  const data = await addTargetLambda(ruleName, LAMBDA_ARN, LAMBDA_NAME, INPUT_JSON);
  console.log('data: ', data);
  res.status(200).send('Test success');
})

module.exports = router;
