const { LambdaClient, AddPermissionCommand, RemovePermissionCommand } = require('@aws-sdk/client-lambda');
const { AWS_CRED } = require('../../constants/aws/cred');

const lambdaClient = new LambdaClient({ AWS_CRED });

module.exports = {
  lambdaClient,
  AddPermissionCommand,
  RemovePermissionCommand,
};
