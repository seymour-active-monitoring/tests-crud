const { dbQuery } = require('../conn');

async function deleteTestRegions(testId) {
  const deleteRegionsQuery = `
    DELETE FROM tests_regions 
    WHERE test_id = '${testId}'
  `;
  const result = await dbQuery(deleteRegionsQuery);
  return result.rows;
}

module.exports = deleteTestRegions;
