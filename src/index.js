const express = require('express');
const http = require('http');
const morgan = require('morgan');
const Redis = require('ioredis');
const bodyParser = require('body-parser');
const catchError = require('./utils/catchError');

const redis = new Redis({
  port: 6379,
  host: process.env.REDIS_HOST || '127.0.0.1'
});
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    version: 2,
    env: process.env
  });
});

const setRedisHandler = async (req, res) => {
  await redis.set(req.params.key, JSON.stringify(req.body));
  res.sendStatus(204);
};

const getRedisHandler = async (req, res) => {
  const value = await redis.get(req.params.key);
  res.json(JSON.parse(value));
};

app.post('/redis/:key', catchError(setRedisHandler));
app.get('/redis/:key', catchError(getRedisHandler));

let httpServer;

const start = () => {
  const port = process.env.PORT || 8080;
  httpServer = app.listen(port, () => {
    console.log(`Example app listening on port ${httpServer.address().port}!`);
  });
  httpServer.on('close', () => {
    console.log('Closing server');
    redis.quit();
  });
};

const stop = () => {
  return new Promise((resolve, reject) => {
    httpServer.close(err => {
      if (err) return reject(err);
      resolve();
    });
  });
};

if (process.env.NODE_ENV !== 'unittest') start();

module.exports = app;
module.exports.start = start;
module.exports.stop = stop;
