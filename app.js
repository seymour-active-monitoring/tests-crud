const express = require('express');
const cors = require('cors');
const { getDummyData } = require('./lib/db/query');
const routes = require('./routes/api');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());

app.use(cors());

app.get('/', async (req, res) => {
  res.status(200).send('Hello!');
});

app.get('/dummydata', async (req, res) => {
  const dummydata = await getDummyData();
  res.status(200).send(dummydata);
});

app.use('/api', routes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server running on Port ', PORT);
});
