import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get/users return an array of users with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get('/users');
    console.log(req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
  
  it('Get /users/:id returns an user with an OK status', async () => {
    const req = await request(app.getHttpServer()).get('/users/1');
    console.log(req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });
  
  it('Get /users/:id throws a notfoundexception if the user does not exist, with a message usuario no encontrado', async () => {
    const req = await request(app.getHttpServer()).get('/users/13');
    expect(req.status).toBe(HttpStatus.NOT_FOUND);
    expect(req.body.message).toBe('Usuario no encontrado');
  });
});
