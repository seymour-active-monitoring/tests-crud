const { dbQuery } = require('../conn');

async function getTestAssertions(testId) {
  const query = `
  SELECT 
    a.type,
    a.property,
    ct.name,
    a.expected_value
    
  FROM assertions a
  JOIN comparison_types ct ON ct.id = a.comparison_type_id
  WHERE a.test_id = ${testId}
  AND active = true
  `;

  const result = await dbQuery(query);
  return result.rows;
}

module.exports = getTestAssertions;
