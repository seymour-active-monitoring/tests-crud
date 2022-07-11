const { AWS_CRED } = require('../../constants/aws/cred');
const { EventBridgeClient } = require("@aws-sdk/client-eventbridge");


module.exports.ebClient = new EventBridgeClient({ AWS_CRED });
