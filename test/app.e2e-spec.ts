import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200).expect('ok');
  });

  describe('/results (GET)', () => {
    it('should return an error when no query is provided', () => {
      return request(app.getHttpServer())
        .get('/results')
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty(
            'message',
            "Query parameter 'q' is required",
          );
        });
    });

    it('should return an array of results when a query is provided', () => {
      return request(app.getHttpServer())
        .get('/results?q=test')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
        });
    });

    it('should return objects with url and title fields', () => {
      return request(app.getHttpServer())
        .get('/results?q=test')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          (res.body as any[]).forEach((item) => {
            expect(item).toHaveProperty('url');
            expect(item).toHaveProperty('title');
          });
        });
    });
  });
});
