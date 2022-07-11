const { dbQuery } = require('./conn');

async function getDummyData() {
  const query = `
    SELECT *
    FROM dummy
  `;
  const result = await dbQuery(query);
  return result.rows;
}

module.exports = {
  getDummyData,
};
