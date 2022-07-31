const { dbQuery } = require('./conn');
const helpers = require('../../utils/helpers');

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
   ct.name as comparison,
   a.expected_value target
  FROM assertions a
    JOIN comparison_types ct
    ON a.comparison_type_id = ct.id
    WHERE a.test_id = ${testId};
   `;

  const locationQuery = `
    SELECT 
      DISTINCT r.aws_name
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
      locations: locations.rows.map((location) => location.aws_name),
      minutesBetweenRuns: frequency,
      type: 'api',
      httpRequest: {
        method,
        url,
        headers: headers || {},
        body: body || {},
        assertions: assertions.rows,
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

module.exports.getTests = getTests;
module.exports.getTest = getTest;
module.exports.getSideload = getSideload;
module.exports.getTestBody = getTestBody;
module.exports.getTestsRuns = getTestsRuns;
module.exports.getTestName = getTestName;
module.exports.deleteTest = deleteTest;
