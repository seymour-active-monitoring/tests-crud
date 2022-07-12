const { dbQuery } = require('./conn');

const comparisonTypeIds = {
  less_than: 1,
  greater_than: 2,
  not_equals: 3,
  equals: 4,
  is_not_empty: 7,
};

// async function addTestAssertion(testId, type, detail) {
//   const query = `
//     INSERT INTO assertions (test_id, type, property, comparison_type_id, expected_value)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING id
//   `;

//   const result = await dbQuery(
//     query,
//     testId,
//     type,
//     detail.property || null,
//     comparisonTypeIds[detail.comparison],
//     detail.target || null,
//   );

//   if (result.rowCount === 0) return false;
//   return true;
// }

async function addNewTest(ruleName, test) {
  const { minutesBetweenRuns, http_request: httpRequest } = test;
  const query = `
    INSERT INTO tests (name, run_frequency_mins, method, url, status) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  const addTestResult = await dbQuery(query, ruleName, minutesBetweenRuns, httpRequest.method, httpRequest.url, 'enabled');

  // if (addTestResult.rowCount === 1) {
  //   return addAllTestAssertions(addTestAssertion, addTestResult, httpRequest);
  // }
  return addTestResult;
}

module.exports = {
  addNewTest,
};
