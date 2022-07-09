const { PutRuleCommand } = require('@aws-sdk/client-eventbridge');
const { ebClient } = require('./event_bridge_client');

const createRule = async () => {
	const params = {
		Name: `TEST_RULE_CREATED_AT_${Date.now()}`,
		ScheduleExpression: 'rate(2 minutes)',
		State: 'ENABLED',
	};

  try {
    const data = await ebClient.send(new PutRuleCommand(params));
    console.log('Success, scheduled rule created; Rule ARN:', data);
    return data; // For unit tests. (not important right now)
  } catch (err) {
    console.log('Error', err);
  }
}

module.exports = {
  createRule
}
