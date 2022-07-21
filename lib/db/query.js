const { dbQuery } = require('./conn');
const helpers = require('../../utils/helpers');

// TODO: Move to db lookup
const comparisonTypeIds = {
  equal_to: 1,
  not_equal_to: 2,
  greater_than: 3,
  less_than: 4,
  greater_than_or_equal_to: 5,
  less_than_or_equal_to: 6,
  has_key: 7,
  not_has_key: 8,
  has_value: 9,
  not_has_value: 10,
  is_empty: 11,
  is_not_empty: 12,
  contains: 13,
  not_contains: 14,
  is_null: 15,
  is_not_null: 16,
};

// TODO: Move to db lookup
const httpMethodIds = {
  GET: 1,
  POST: 2,
  PUT: 3,
  DELETE: 4,
  PATCH: 5,
  HEAD: 6,
};

async function addNewTestAssertions(testId, assertions) {
  let query = `
    INSERT INTO assertions (test_id, type, property, comparison_type_id, expected_value)
    VALUES
  `;
  Object.keys(assertions).forEach((key) => {
    if (Array.isArray(assertions[key])) {
      const detailsArr = assertions[key];
      detailsArr.forEach((subAssertion) => {
        const comparisonTypeId = comparisonTypeIds[subAssertion.comparison];
        query += `(${testId}, '${key}', '${subAssertion.property || null}', ${comparisonTypeId}, '${subAssertion.target || null}'),`;
      });
    } else {
      const details = assertions[key];
      const comparisonTypeId = comparisonTypeIds[details.comparison];
      query += `(${testId}, '${key}', '${details.property || null}', ${comparisonTypeId}, '${details.target || null}'),`;
    }
  });

  let queryCopy = query.slice(0, query.length - 1).replace(/'null'/g, null);
  queryCopy += ';';
  const result = await dbQuery(queryCopy);

  if (result.rowCount === 0) return false;
  return true;
}

async function addNewTest(ruleName, RuleArn, test) {
  const { minutesBetweenRuns, httpRequest } = test;
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
    return addNewTestAssertions(testId, httpRequest.assertions);
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
  ct.symbol AS "comparison_type",
  a.expected_value,
  ar.pass
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
    comparisonTypes: coparisonTypesResult.rows,
    regions: regionsResult.rows,
    httpMethods: methodQueryResult.rows,
    assertionTypes: assertionTypesResult.rows,
  };
}

async function getTestBody(testId) {
  const query1 = `
  SELECT 
    t.name,
    t.run_frequency_mins as frequency,
    t.headers,
    t.payload as body,
    t.url,
    hp.name as method
  FROM tests t
    JOIN http_methods hp ON hp.id = t.method_id 
    WHERE t.id = ${testId};
  `;

  const query2 = `
  SELECT 
   a.type,
   a.property,
   a.expected_value,
   ct.name
  FROM assertions a
    JOIN comparison_types ct
    ON a.comparison_type_id = ct.id
    WHERE a.test_id = ${testId};
   `;

  const query3 = `
    SELECT 
      DISTINCT r.name
    FROM regions r
      JOIN test_runs tr ON r.id = tr.region_id
      WHERE tr.test_id = ${testId};
    `;

  const testCofnig = await dbQuery(query1);
  const assertions = await dbQuery(query2);
  const locations = await dbQuery(query3);

  // eslint-disable-next-line object-curly-newline
  const { name, frequency, headers, body, url, method } = testCofnig.rows[0];

  const json = {
    test: {
      title: name,
      locations: locations.rows.map((obj) => helpers.toDash(obj.name)),
      minutesBetweenRuns: frequency,
      type: 'API',
      httpRequest: {
        method,
        url,
        headers,
        body,
        assertions: helpers.toCamelCase(assertions.rows, 'type'),
      },
    },
  };

  return json;
}

module.exports.addNewTest = addNewTest;
module.exports.getTests = getTests;
module.exports.getTest = getTest;
module.exports.getSideload = getSideload;
module.exports.getTestBody = getTestBody;
