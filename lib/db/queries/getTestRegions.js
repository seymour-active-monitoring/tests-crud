const { dbQuery } = require('../conn');

async function getTestRegions(testId) {
  const query = `
  SELECT 
    r.name,
    r.aws_name
  FROM tests_regions tr
  JOIN regions r ON r.id = tr.region_id
  WHERE tr.test_id = ${testId}
  `;

  const result = await dbQuery(query);
  return result.rows;
}

module.exports = getTestRegions;
