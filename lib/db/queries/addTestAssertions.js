const { comparisonTypeToId } = require('../../../utils/helpers');
const { dbQuery } = require('../conn');

async function addNewTestAssertions(testId, assertions) {
  let query = `
    INSERT INTO assertions (test_id, type, property, comparison_type_id, expected_value)
    VALUES
  `;
  assertions.forEach((assertion) => {
    const comparisonId = comparisonTypeToId(assertion.comparison);
    query += `(${testId}, '${assertion.type}', '${assertion.property || null}', ${comparisonId}, '${assertion.target || null}'),`;
  });

  let queryCopy = query.slice(0, query.length - 1).replace(/'null'/g, null);
  queryCopy += ' RETURNING id, type, property, comparison_type_id, expected_value;';
  const result = await dbQuery(queryCopy);
  return result.rows;
}

module.exports = addNewTestAssertions;
