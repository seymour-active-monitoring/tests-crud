const { dbQuery } = require('./conn');

const comparisonTypeIds = {
  less_than: 1,
  greater_than: 2,
  not_equals: 3,
  equals: 4,
  is_not_empty: 7,
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

async function addNewTest(ruleName, test) {
  const { minutesBetweenRuns, httpRequest } = test;
  const query = `
    INSERT INTO tests (name, run_frequency_mins, method, url, status) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  const result = await dbQuery(query, ruleName, minutesBetweenRuns, httpRequest.method, httpRequest.url, 'enabled');

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

async function getTestDB(testId) {
  const query = `
  SELECT 
  t.name,
  t.method,
  t.url,
  r.aws_name AS "region",
  a.type,
  a.property,
  ar.actual_value,
  ct.symbol AS "comparison_type",
  a.expected_value,
  ar.pass
FROM tests t
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

module.exports = {
  addNewTest,
  getTests,
  getTestDB,
};
