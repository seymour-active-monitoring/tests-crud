require('dotenv').config();

module.exports.RULE_TARGET_INFO = {
  'test-route-packager': {
    arn: process.env.TEST_ROUTE_PACKAGER_ARN,
    title: process.env.TEST_ROUTE_PACKAGER_NAME,
    url: process.env.TEST_ROUTE_PACKAGER_URL,
  },
};
