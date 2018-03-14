const { assert } = require('chai');
const request = require('supertest');
const server = require('../src');

before(server.start);
after(server.stop);

module.exports.get = (url, status, headers = {}) => {
  return request(server)
    .get(url)
    .set('Accept', 'application/json')
    .set(headers);
};

module.exports.post = (url, body, headers = {}) => {
  return request(server)
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .set(headers);
};
