const { dbQuery } = require('./conn');
const helpers = require('../../utils/helpers');

// TODO: Move to db lookup
const comparisonIds = {
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
};

// TODO: Move to db lookup
const httpMethodIds = {
  get: 1,
  post: 2,
  put: 3,
  delete: 4,
  patch: 5,
  head: 6,
};

async function addNewTestAlert(testId, alertChannel) {
  const query1 = `
    INSERT INTO notification_settings (alerts_on_recovery, alerts_on_failure)
    VALUES ($1, $2)
    RETURNING id
  `;

  const query2 = `
    INSERT INTO alerts (type, destination, notification_settings_id)
    VALUES ($1, $2, $3)
    RETURNING id
  `;

  const query3 = `
    INSERT INTO tests_alerts (test_id, alerts_id)
    VALUES ($1, $2)
  `;

  let notificationSettingsId;
  let alertsId;
  let addAlertResult = false;

  try {
    const result1 = await dbQuery(
      query1,
      alertChannel.alertsOnRecovery,
      alertChannel.alertsOnFailure,
    );
    notificationSettingsId = result1.rows[0].id;

    const result2 = await dbQuery(
      query2,
      alertChannel.type,
      alertChannel.destination,
      notificationSettingsId,
    );
    alertsId = result2.rows[0].id;

    const result3 = await dbQuery(query3, testId, alertsId);
    addAlertResult = result3.rowCount === 1;
  } catch (e) {
    console.error(e);
  }
  return addAlertResult;
}

async function addNewTestAlerts(testId, alertChannels) {
  try {
    // eslint-disable-next-line max-len
    const result = await Promise.all(alertChannels.map((channel) => addNewTestAlert(testId, channel)));
    console.log('Add New Test Alerts Result: ', result);
  } catch (e) {
    console.error(e);
  }
}

async function addNewTestAssertions(testId, assertions) {
  let query = `
    INSERT INTO assertions (test_id, type, property, comparison_type_id, expected_value)
    VALUES
  `;
  assertions.forEach((assertion) => {
    const comparisonId = comparisonIds[assertion.comparison];
    query += `(${testId}, '${assertion.type}', '${assertion.property || null}', ${comparisonId}, '${assertion.target || null}'),`;
  });

  let queryCopy = query.slice(0, query.length - 1).replace(/'null'/g, null);
  queryCopy += ';';
  const result = await dbQuery(queryCopy);
  if (result.rowCount === 0) return false;
  return true;
}

async function addNewTest(ruleName, RuleArn, test) {
  const { minutesBetweenRuns, httpRequest, alertChannels } = test;
  const query = `
    INSERT INTO tests (name, run_frequency_mins, method_id, url, status, eb_rule_arn) 
    VALUES ('${ruleName}', '${minutesBetweenRuns}', '${httpMethodIds[httpRequest.method]}', '${httpRequest.url}', 'enabled', '${RuleArn}')
    RETURNING id
  `;

  const result = await dbQuery(
    query,
  );

  if (result.rowCount === 1) {
    const { id: testId } = result.rows[0];
    addNewTestAssertions(testId, httpRequest.assertions);
    addNewTestAlerts(testId, alertChannels);
  }
  return false;
}

async function getTests() {
  const query = 'SELECT * FROM tests';

  const result = await dbQuery(query);
  return result.rows;
}

async function getTest(testId) {
  const query = `
  SELECT 
  t.name,
  h.name,
  t.url,
  r.aws_name AS "region",
  a.type,
  a.property,
  ar.actual_value,
  ct.name AS "comparison",
  a.expected_value,
  ar.success
FROM tests t
  JOIN http_methods h ON h.id = t.method_id
  JOIN test_runs tr ON tr.test_id = t.id
  JOIN regions r ON r.id = tr.region_id
  JOIN assertion_results ar ON ar.test_run_id = tr.id
  JOIN assertions a ON a.id = ar.assertion_id
  JOIN comparison_types ct ON ct.id = a.comparison_type_id
WHERE t.id = ${testId}
  `;

  const result = await dbQuery(query);
  return result.rows;
}

async function getSideload() {
  const regionsQuery = 'SELECT * FROM regions;';
  const comparisonTypesQuery = 'SELECT * FROM comparison_types;';
  const methodQuery = 'SELECT * FROM http_methods WHERE supported=true;';
  const assertinTypesQuery = 'SELECT * FROM assertion_types;';

  const regionsResult = await dbQuery(regionsQuery);
  const coparisonTypesResult = await dbQuery(comparisonTypesQuery);
  const methodQueryResult = await dbQuery(methodQuery);
  const assertionTypesResult = await dbQuery(assertinTypesQuery);

  return {
    comparisons: coparisonTypesResult.rows,
    regions: regionsResult.rows,
    httpMethods: methodQueryResult.rows,
    assertionTypes: assertionTypesResult.rows,
  };
}

async function getTestBody(testId) {
  const configQuery = `
  SELECT 
    t.name,
    t.run_frequency_mins as frequency,
    t.headers,
    t.body,
    t.url,
    hp.name as method
  FROM tests t
    JOIN http_methods hp ON hp.id = t.method_id 
    WHERE t.id = ${testId};
  `;

  const assertionQuery = `
  SELECT 
   a.type,
   a.property,
   a.expected_value,
   ct.name as comparison
  FROM assertions a
    JOIN comparison_types ct
    ON a.comparison_type_id = ct.id
    WHERE a.test_id = ${testId};
   `;

  const locationQuery = `
    SELECT 
      DISTINCT r.name
    FROM regions r
      JOIN test_runs tr ON r.id = tr.region_id
      WHERE tr.test_id = ${testId};
    `;

  const testCofnig = await dbQuery(configQuery);
  const assertions = await dbQuery(assertionQuery);
  const locations = await dbQuery(locationQuery);

  // eslint-disable-next-line object-curly-newline
  const { name, frequency, headers, body, url, method } = testCofnig.rows[0];

  const json = {
    test: {
      title: name,
      locations: locations.rows.map((obj) => helpers.toDash(obj.name)),
      minutesBetweenRuns: frequency,
      type: 'api',
      httpRequest: {
        method: method.toUpperCase(),
        url,
        headers,
        body,
        assertions: helpers.formatAssertions(assertions.rows),
      },
    },
  };
  return json;
}

async function getTestsRuns(id) {
  const testsQuery = `
    SELECT 
    t.name,
    t.url,
    t.created_at,
    t.updated_at,
    hm.display_name
    FROM tests t
    JOIN http_methods hm ON hm.id = t.method_id
    WHERE t.id = ${id};`;

  const runsQuery = `
    SELECT DISTINCT
      tr.id test_run_id,
      r.id region_id,
      r.display_name,
      r.flag_url,
      tr.success,
      tr.started_at,
      tr.completed_at,
      EXTRACT(EPOCH FROM (tr.completed_at - tr.started_at)) AS difference
    FROM test_runs tr
     JOIN assertion_results ar ON tr.id = ar.test_run_id
     JOIN regions r ON tr.region_id = r.id
     WHERE tr.test_id = ${id}`;

  const assertionsResultsQuery = `
    SELECT
     tr.id test_run_id, 
     ar.success,
     ar.id assertion_id
    FROM assertion_results ar
    JOIN test_runs tr ON ar.test_run_id = tr.id
    WHERE tr.test_id = ${id};
  `;

  const tests = await dbQuery(testsQuery);
  const runs = await dbQuery(runsQuery);
  const assertionResults = await dbQuery(assertionsResultsQuery);

  const json = {
    name: tests.rows[0].name || null,
    method: tests.rows[0].display_name || null,
    url: tests.rows[0].url || null,
    createdAt: tests.rows[0].created_at,
    updatedAt: tests.rows ? tests.rows[0].updated_at : null,
    runs: helpers.formatRuns(runs.rows, assertionResults.rows),
  };

  return json;
}

async function getTestName(testId) {
  const query = `
    SELECT name FROM tests WHERE id = ${testId}
  `;
  const data = await dbQuery(query);
  return data.rows[0].name;
}

async function deleteTest(testId) {
  const query = `DELETE FROM tests WHERE id = ${testId};`;

  const data = await dbQuery(query);
  console.log('deleted data', data);
}

module.exports.addNewTest = addNewTest;
module.exports.getTests = getTests;
module.exports.getTest = getTest;
module.exports.getSideload = getSideload;
module.exports.getTestBody = getTestBody;
module.exports.getTestsRuns = getTestsRuns;
module.exports.getTestName = getTestName;
module.exports.deleteTest = deleteTest;
