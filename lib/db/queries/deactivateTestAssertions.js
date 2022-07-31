const { dbQuery } = require('../conn');

async function deactivateTestAssertions(testId) {
  const updateTestAssertionsQuery = `
    UPDATE assertions 
    SET active = false 
    WHERE test_id = '${testId}'
  `;
  const result = await dbQuery(updateTestAssertionsQuery);
  return result.rows;
}

module.exports = deactivateTestAssertions;
