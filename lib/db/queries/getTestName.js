const { dbQuery } = require('../conn');

async function getTestName(testId) {
  const query = `
    SELECT name FROM tests WHERE id = ${testId}
  `;
  const data = await dbQuery(query);
  return data.rows[0].name;
}

module.exports = getTestName;
