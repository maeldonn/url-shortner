const request = require('supertest');
const { expect } = require('chai');

const models = require('../src/urls/urls.models');
const app = require('../src/app');

describe('POST /', () => {
  before(async () => {
    await models.Urls.collection.drop();
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

  it('should not allow more than 10 request per minute', async () => {
    // TODO : Test the url lifetime
  });
});

describe('GET /:id', () => {
  it('should respond with a 404', async () => {
    await request(app)
      .get('/12344')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(404);
  });

  it('should redirect to the correct url', async () => {
    await request(app)
      .get('/12345')
      .send({})
      .set('Accept', 'application/json')
      .expect(302);
  });
});

describe('GET /*/*', () => {
  it('should respond with a 404', async () => {
    await request(app)
      .get('/12344')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(404);
  });
});
