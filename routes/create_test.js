const Router = require('express');
const router = new Router();
const { PutRuleCommand, PutTargetsCommand, PutEventsCommand } = require("@aws-sdk/client-eventbridge");
const { createRule } = require('../lib/aws/event_bridge_actions');

router.post('/api/test', async (req, res) => {
  createRule();
  res.status(200).send('Test success');
})

module.exports = router;
