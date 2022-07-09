const express = require('express');
require('dotenv').config()

const PORT = process.env.PORT || 5001;

const app = express()

app.get('/', async (req, res) => {
  res.status(200).send('Hello!');
})

app.get('/dummydata', require('./routes/dummydata'));
app.post('/api/test', require('./routes/create_test'));

app.listen(PORT, err=> {
  if(err) console.log(err);
  console.log('Server running on Port ', PORT);
})
