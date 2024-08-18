import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let authorizationHeader:string;

  beforeEach(async () => {
    authorizationHeader = "Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjc0YjQyZi03MmI1LTQxZDUtOTc4OS1lNTExZmMzM2IwOGQiLCJpZCI6IjEyNzRiNDJmLTcyYjUtNDFkNS05Nzg5LWU1MTFmYzMzYjA4ZCIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjpbIkFkbWluIl0sImlhdCI6MTcyMzUwNjg5NiwiZXhwIjoxNzIzNTEwNDk2fQ._rL_iPN41-9Oqw0RgVwGcZDeFhRPhcPnOGZJ_R0ofPE"

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach( async () => {
    await app.close();
  })

  //USERS ROUTES
  it('get/users return an error if it didnt come with a valid authorization token', async () => {
    authorizationHeader = "Baerer not-valid-token"
    
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', authorizationHeader)    

    expect(req.status).toBe(401);
    expect(req.body.message).toBe('Invalid token');
  });
  
  it('get/users return an array of users with an OK status code', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', authorizationHeader)    

    expect(req.status).toBe(HttpStatus.OK);
    expect(req.body).toBeInstanceOf(Array);
  });
  
  it('Get /users/:id returns an user with an OK status', async () => {
    const id = "6dbd0627-1499-479c-81df-3b843a4ee330"
    const req = await request(app.getHttpServer())
      .get(`/users/${id}`)
      .set('Authorization', authorizationHeader)    

    expect(req.status).toBe(HttpStatus.OK);
    expect(req.body).toBeInstanceOf(Object);
    expect(req.body.id).toBe(id);
  });
  
  it('Get /users/:id throws a notfoundexception if the user does not exist, with a message usuario no encontrado', async () => {
    const req = await request(app.getHttpServer())
      .get('/users/id-not-uuid')
      .set('Authorization', authorizationHeader)    

    expect(req.status).toBe(HttpStatus.BAD_REQUEST);
    expect(req.body.message).toBe('Validation failed (uuid is expected)');
  });
  
  it('Get /users/:id throws a notfoundexception if the user does not exist, with a message usuario no encontrado', async () => {
    const uuidNotValid:string = "6dbd0627-1499-479c-81df-3b843a4ee300";
    const req: request.Response = await request(app.getHttpServer())
      .get(`/users/${uuidNotValid}`)
      .set('Authorization', authorizationHeader)    

    expect(req.status).toBe(HttpStatus.NOT_FOUND);
    expect(req.body.message).toBe(`User with ID ${uuidNotValid} not found`);
  });
  
  //PRODUCTS ROUTES
  it('Get /products/ returns an array of 5 products (default limit) with an OK status', async () => {
    const req: request.Response = await request(app.getHttpServer())
      .get(`/products/`)
      .set('Authorization', authorizationHeader)    

    expect(req.status).toBe(HttpStatus.OK);
    expect(req.body).toBeInstanceOf(Array);
    expect(req.body.length).toBe(5);
  });
});
