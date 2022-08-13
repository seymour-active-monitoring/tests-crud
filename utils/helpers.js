/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */

const httpMethodToId = (method) => {
  return {
    get: 1,
    post: 2,
    put: 3,
    delete: 4,
    patch: 5,
    head: 6,
  }[method];
};

const comparisonTypeToId = (type) => {
  return {
    equalTo: 1,
    notEqualTo: 2,
    greaterThan: 3,
    lessThan: 4,
    greaterThanOrEqualTo: 5,
    lessThanOrEqualTo: 6,
    hasKey: 7,
    notHasKey: 8,
    hasValue: 9,
    notHasValue: 10,
    isEmpty: 11,
    isNotEmpty: 12,
    contains: 13,
    notContains: 14,
    isNull: 15,
    isNotNull: 16,
  }[type];
};

const comparisonIdToType = (id) => {
  return {
    1: 'equalTo',
    2: 'notEqualTo',
    3: 'greaterThan',
    4: 'lessThan',
    5: 'greaterThanOrEqualTo',
    6: 'lessThanOrEqualTo',
    7: 'hasKey',
    8: 'notHasKey',
    9: 'hasValue',
    10: 'notHasValue',
    11: 'isEmpty',
    12: 'isNotEmpty',
    13: 'contains',
    14: 'notContains',
    15: 'isNull',
    16: 'isNotNull',
  }[id];
};

const regionNameToId = (awsRegionName) => {
  return {
    'us-east-1': 1,
    'us-east-2': 2,
    'us-west-1': 3,
    'us-west-2': 4,
    'ca-central-1': 5,
    'sa-east-1': 6,
    'eu-north-1': 7,
    'eu-west-3': 8,
    'eu-west-2': 9,
    'eu-west-1': 10,
    'eu-central-1': 11,
    'eu-south-1': 12,
    'me-south-1': 13,
    'af-south-1': 14,
    'ap-southeast-1': 15,
    'ap-northeast-1': 16,
    'ap-northeast-3': 17,
    'ap-east-1': 18,
    'ap-southeast-2': 19,
    'ap-southeast-3': 20,
    'ap-northeast-2': 21,
    'ap-south-1': 22,

  }[awsRegionName];
};

module.exports.httpMethodToId = httpMethodToId;
module.exports.comparisonTypeToId = comparisonTypeToId;
module.exports.comparisonIdToType = comparisonIdToType;
module.exports.regionNameToId = regionNameToId;
