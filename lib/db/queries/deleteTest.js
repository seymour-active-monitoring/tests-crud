const { dbQuery } = require('../conn');

async function deleteTest(testId) {
  const query = `DELETE FROM tests WHERE id = ${testId};`;

  const data = await dbQuery(query);
  console.log('deleted data', data);
}

module.exports = deleteTest;
