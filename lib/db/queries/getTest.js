const { dbQuery } = require('../conn');

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

module.exports = getTest;
