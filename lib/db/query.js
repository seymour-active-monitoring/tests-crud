const { dbQuery } = require("./conn");

async function getDummyData() {
  const query = `
    SELECT *
    FROM dummy
  `;
  let result = await dbQuery(query);
  return result.rows;
}

module.exports = {
  getDummyData
};
