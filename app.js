const express = require('express');
const { getDummyData } = require('./lib/db_query');
require('dotenv').config()

const PORT = process.env.PORT || 5001;

const app = express()

app.get("/", async (req, res) => {
  res.status(200).send("Hello!");
})

app.get("/dummydata", async (req, res) => {
  const dummydata = await getDummyData();
  res.status(200).send(dummydata);
})

app.listen(PORT, err=> {
  if(err) console.log(err);
  console.log('Server running on Port ', PORT);
})
