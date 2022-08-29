import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index.js';
import testUser from './testUser.js';

describe('POST /auth/login', () => {
  it('Should return status 200', async () => {
    await supertest(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);
  });

  it('Should return status 401', async () => {
    await supertest(app)
      .post('/auth/login')
      .send({
        email: 'aaa',
        password: 'aaaaa',
      })
      .expect(401);
  });

  it('Should return the correct email address', async () => {
    const resp = await supertest(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);

    expect(resp.body.userData.email).to.equal(testUser.email);
  });
});
