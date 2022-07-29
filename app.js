const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/api');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server running on Port ', PORT);
});
