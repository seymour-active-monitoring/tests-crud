const { EventBridgeClient } = require('@aws-sdk/client-eventbridge');
const { AWS_CRED } = require('../../constants/aws/cred');

module.exports.ebClient = new EventBridgeClient({ AWS_CRED });
