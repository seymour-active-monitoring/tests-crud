const axios = require('axios');
const { validationResult } = require('express-validator');
const { RULE_TARGET_INFO } = require('../constants/aws/locationMappings');
const {
  putTestRule,
  addTargetLambda,
  removeRule,
  removeTarget,
} = require('../lib/aws/eventBridgeActions');
const queries = require('../lib/db/queries');
const { modelToEntityTest, entityToJsonTests, entityToJsonTest } = require('../mappers/test');
const { modelToEntityTestRun } = require('../mappers/testRun');
const Tests = require('../entities/Tests');
const { modelToEntityAssertion } = require('../mappers/assertion');
const { comparisonIdToType } = require('../utils/helpers');

const createEventBridgeRule = async (reqBody) => {
  const { test } = reqBody;
  let targetResponse;
  let permissionsResponse;
  try {
    const { RuleArn } = await putTestRule({
      name: `${test.title}`,
      minutesBetweenRuns: test.minutesBetweenRuns,
    });
    const ruleName = RuleArn.split('/').slice(-1)[0];

    targetResponse = await addTargetLambda({
      ruleName,
      lambdaArn: RULE_TARGET_INFO['test-route-packager'].arn,
      lambdaName: RULE_TARGET_INFO['test-route-packager'].title,
      inputJSON: JSON.stringify(reqBody),
    });
  } catch (err) {
    console.log('Error: ', err);
    return err;
  }
  return { targetResponse, permissionsResponse };
};

const assignAssertionIds = (requestAssertions, dbAssertions) => {
  const dbAssertionsLookup = {};
  dbAssertions.forEach((a) => {
    const assertionKey = `${a.type}-${a.property ? a.property : ''}-${comparisonIdToType(a.comparison_type_id)}-${a.expected_value ? a.expected_value : ''}}`;
    dbAssertionsLookup[assertionKey] = a;
  });

  requestAssertions.forEach((a) => {
    const assertionKey = `${a.type}-${a.property ? a.property : ''}-${a.comparison}-${a.target ? a.target : ''}}`;
    const assertionId = dbAssertionsLookup[assertionKey].id;
    a.id = assertionId;
  });
};

const createTest = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const { test } = req.body;
      const { id: testId } = await queries.addNewTest(test);
      test.id = testId;
      const assertionsData = await queries.addTestAssertions(testId, test.httpRequest.assertions);
      assignAssertionIds(test.httpRequest.assertions, assertionsData);
      await queries.addTestAlerts(testId, test.alertChannels);
      await queries.addTestRegions(testId, test.locations);
      await createEventBridgeRule(req.body);
      res.status(201).send(`Test ${req.body.test.title} created`);
    } catch (err) {
      console.log('Error: ', err);
    }
  } else {
    res.status(400).json({ errors: errors.array() });
  }
};

const editEventBridgeRule = async (reqBody) => {
  const { test } = reqBody;
  let targetResponse;
  try {
    const { RuleArn } = await putTestRule({
      name: `${test.title}`,
      minutesBetweenRuns: test.minutesBetweenRuns,
    });
    const ruleName = RuleArn.split('/').slice(-1)[0];

    targetResponse = await addTargetLambda({
      ruleName,
      lambdaArn: RULE_TARGET_INFO['test-route-packager'].arn,
      lambdaName: RULE_TARGET_INFO['test-route-packager'].title,
      inputJSON: JSON.stringify(reqBody),
    });
  } catch (err) {
    console.log('Error: ', err);
    return err;
  }
  return { targetResponse };
};

const editTest = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const { test } = req.body;
      const { id: testId } = await queries.editTest(test);
      test.id = testId;
      await queries.deactivateTestAssertions(testId);
      const assertionsData = await queries.addTestAssertions(testId, test.httpRequest.assertions);
      assignAssertionIds(test.httpRequest.assertions, assertionsData);
      await queries.deleteTestAlerts(testId);
      await queries.addTestAlerts(testId, test.alertChannels);
      await queries.deleteTestRegions(testId);
      await queries.addTestRegions(testId, test.locations);
      await editEventBridgeRule(req.body);
      res.status(200).send(`Test ${req.body.test.title} updated`);
    } catch (err) {
      console.log('Error: ', err);
    }
  } else {
    res.status(400).json({ errors: errors.array() });
  }
};

const getTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const data = await queries.getTestBody(testId);
    res.json(data);
  } catch (err) {
    console.log('Error: ', err);
  }
};

const getTests = async (req, res) => {
  try {
    const tests = new Tests();
    const testsData = await queries.getAllTests();
    testsData.forEach((t) => {
      const test = modelToEntityTest(t);
      if (!tests.containsTest(test.id)) {
        tests.addTest(test);
      }
      const testRun = modelToEntityTestRun(t);
      if (testRun) {
        const testRunTest = tests.getTest(testRun.testId);
        testRunTest.addRun(testRun);
      }
    });
    const testsJson = entityToJsonTests(tests);
    res.status(200).json(testsJson);
  } catch (err) {
    res.status(500).send(err);
    console.log('Error: ', err);
  }
};

const runNow = async (req, res) => {
  try {
    const testId = req.params.id;
    // this url will need to come from a config file
    const lambdaURL = RULE_TARGET_INFO['test-route-packager'].url;
    const data = await queries.getTestBody(testId);
    axios.post(lambdaURL, data);
    res.status(200).send('OK');
  } catch (err) {
    console.log('Error: ', err);
  }
};

const getTestRuns = async (req, res) => {
  try {
    const testId = req.params.id;
    const testRunsData = await queries.getTestRuns({ testId });
    const test = modelToEntityTest(testRunsData[0]);
    testRunsData.forEach((tr) => {
      const run = modelToEntityTestRun(tr);
      if (!test.containsRun(run.id)) {
        test.addRun(run);
      }
      const assertion = modelToEntityAssertion(tr);
      const assertionRun = test.getRun(assertion.testRunId);
      assertionRun.addAssertion(assertion);
    });
    const testJson = entityToJsonTest(test);
    res.status(200).json(testJson);
  } catch (err) {
    res.status(500).send(err);
    console.log('Error: ', err);
  }
};

const getTestRun = async (req, res) => {
  try {
    const { runId } = req.params;
    const testRunData = await queries.getTestRuns({ runId });
    const test = modelToEntityTest(testRunData[0]);
    const run = modelToEntityTestRun(testRunData[0]);
    test.addRun(run);
    testRunData.forEach((tr) => {
      const assertion = modelToEntityAssertion(tr);
      run.addAssertion(assertion);
    });
    const testRunJson = entityToJsonTest(test);
    res.status(200).json(testRunJson);
  } catch (err) {
    res.status(500).send(err);
    console.log('Error: ', err);
  }
};

// eslint-disable-next-line consistent-return
const deleteTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const testName = await queries.getTestName(testId);
    try {
      await queries.deleteTest(testId);
    } catch (err) {
      console.log('Error: ', err);
      return err;
    }

    await removeTarget({
      testName,
      lambdaName: RULE_TARGET_INFO['test-route-packager'].title,
    });
    await removeRule(testName);
    res.status(200).send('OK');
  } catch (err) {
    console.log('Error: ', err);
  }
};

exports.runNow = runNow;
exports.createTest = createTest;
exports.getTest = getTest;
exports.getTests = getTests;
exports.getTestRuns = getTestRuns;
exports.getTestRun = getTestRun;
exports.deleteTest = deleteTest;
exports.editTest = editTest;
