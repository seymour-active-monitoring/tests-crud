const DB = require('../lib/db/query');

const getSideload = async (req, res) => {
  try {
    const data = await DB.getSideload();
    res.json(data);
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports.getSideload = getSideload;
