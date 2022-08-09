const { dbQuery } = require('../conn');

async function getTests() {
  const query = 'SELECT * FROM tests';

  const result = await dbQuery(query);
  return result.rows;
}

module.exports = getTests;
