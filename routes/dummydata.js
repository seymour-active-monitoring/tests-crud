const Router = require('express');
const { getDummyData } = require('../lib/db/query');
const router = new Router();

router.get('/dummydata', async (req, res) => {
  const dummydata = await getDummyData();
  res.status(200).send(dummydata);
})

module.exports = router;
