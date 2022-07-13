const { dbQuery } = require('./conn');

const comparisonTypeIds = {
  equal_to: 1,
  not_equal_to: 2,
  has_key: 3,
  not_has_key: 4,
  has_value: 5,
  not_has_value: 6,
  is_empty: 7,
  is_not_empty: 8,
  greater_than: 9,
  less_than: 10,
  greater_than_or_equal_to: 11,
  less_than_or_equal_to: 12,
  contains: 13,
  not_contains: 14,
  is_null: 15,
  is_not_null: 16,
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
    INSERT INTO tests (name, run_frequency_mins, method, url, status, eb_rule_arn) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

  const result = await dbQuery(
    query,
    ruleName,
    minutesBetweenRuns,
    httpRequest.method,
    httpRequest.url,
    'enabled',
    RuleArn,
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

module.exports = {
  addNewTest,
  getTests,
};
