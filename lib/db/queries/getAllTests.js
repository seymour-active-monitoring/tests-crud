const { dbQuery } = require('../conn');

async function getAllTests() {
  const query = `
  WITH ranked_test_runs AS (
    SELECT 
        success,
        test_id,
        id,
        created_at,
        RANK() OVER (PARTITION BY test_id ORDER BY created_at DESC) AS rank
    FROM test_runs
  )
  SELECT 
      t.id AS test_id,
      t.name,
      t.run_frequency_mins,
      t.id AS run_id, 
      rtr.success,
      rtr.rank,
      rtr.created_at
  FROM tests t 
  JOIN ranked_test_runs rtr ON rtr.test_id = t.id AND rtr.rank <= 3
  ORDER BY test_id, rank ASC
  `;

  const result = await dbQuery(query);
  return result.rows;
}

module.exports = getAllTests;