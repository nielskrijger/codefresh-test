const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.json(process.env);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
