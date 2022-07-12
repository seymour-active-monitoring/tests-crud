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
    if (Array.isArray(assertions[key])) { // headers && jsonBody
      const detailsArr = assertions[key];
      detailsArr.forEach((subAssertion) => {
        const comparisonTypeId = comparisonTypeIds[subAssertion.comparison];
        query += `(${testId}, '${key}', '${subAssertion.property || null}', ${comparisonTypeId}, '${subAssertion.target || null}'),`;
      });
    } else { // responseTime and statusCode
      const details = assertions[key];
      const comparisonTypeId = comparisonTypeIds[details.comparison];
      query += `(${testId}, '${key}', '${details.property || null}', ${comparisonTypeId}, '${details.target || null}'),`;
    }
  });

  let queryCopy = query.slice(0, query.length - 1);
  queryCopy += ';';
  const result = await dbQuery(queryCopy);

  if (result.rowCount === 0) return false;
  return true;
}

async function addNewTest(ruleName, test) {
  const { minutesBetweenRuns, http_request: httpRequest } = test;
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

module.exports = {
  addNewTest,
};
