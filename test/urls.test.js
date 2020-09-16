const request = require('supertest');
const { expect } = require('chai');

const Url = require('../src/urls/urls.model');
const app = require('../src/app');

describe('POST /', () => {
  before(async () => {
    await Url.collection.drop();
  });

  it('should require an url', async () => {
    const response = await request(app)
      .post('/')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Invalid url');
  });

  it('should not allow empty url', async () => {
    const response = await request(app)
      .post('/')
      .send({
        url: '',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Invalid url');
  });

  it('should not allow non valid url', async () => {
    const response = await request(app)
      .post('/')
      .send({
        url: 'iamnotanurl',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Invalid url');
  });

  it('should not allow empty slug', async () => {
    const response = await request(app)
      .post('/')
      .send({
        url: 'https://www.google.com/',
        slug: '',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Invalid slug');
  });

  it('should not allow non valid slug', async () => {
    const response = await request(app)
      .post('/')
      .send({
        url: 'https://www.google.com/',
        slug: 'az@',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Invalid slug');
  });

  it('should create a short url', async () => {
    const response = await request(app)
      .post('/')
      .send({
        url: 'https://www.google.com/',
        slug: '12345',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body).to.have.property('url');
    expect(response.body).to.have.property('slug');
    expect(response.body).to.have.property('link');
  });

  it('should not allow already used slug', async () => {
    const response = await request(app)
      .post('/')
      .send({
        url: 'https://www.youtube.com/',
        slug: '12345',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409);
    expect(response.body.message).to.equal('Slug is already in use');
  });

  it('should not allow more than 10 request per minute', async () => {
    // TODO : Test the request limiter
  });
});

describe('GET /:id', () => {
  it('should respond with a 404', async () => {
    const response = await request(app)
      .get('/12344')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.message).to.equal("Slug doesn't exist");
  });

  it('should redirect to the correct url', async () => {
    await request(app)
      .get('/12345')
      .send({})
      .set('Accept', 'application/json')
      .expect(302);
  });
});
