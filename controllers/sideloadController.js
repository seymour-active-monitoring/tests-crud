// const DB = require('../lib/db/query');
const queries = require('../lib/db/queries');

const getSideload = async (req, res) => {
  try {
    const data = await queries.getSideload();
    res.json(data);
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports.getSideload = getSideload;
