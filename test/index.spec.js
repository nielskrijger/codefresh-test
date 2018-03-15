const { assert } = require('chai');
const shortid = require('shortid');
const { get, post } = require('./helpers');

it('should store and retrieve a redis key using the REST api', async () => {
  const id = shortid.generate();
  await post(`/redis/${id}`, { text: 'Hello!' }).expect(204);

  const { body } = await get(`/redis/${id}`).expect(200);
  assert.equal(body.text, 'Hello!');
});

it('should fail if FAIL=true', () => {
  assert.notEqual(process.env.FAIL, 'true');
});

it('should return 200 on healthcheck url', async () => {
  await get('/healthcheck').expect(200);
});
