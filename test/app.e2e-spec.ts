import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PaginatedData } from 'src/pagination/paginated-data.interface';
import { Result } from 'src/results/result.interface';

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

    it('should return paginated results when a query is provided', () => {
      return request(app.getHttpServer())
        .get('/results?q=test&page=1&size=2')
        .expect(200)
        .expect((res) => {
          const body: PaginatedData<Result> = res.body as PaginatedData<Result>;
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('pagination');
          expect(Array.isArray(body.data)).toBeTruthy();
          expect(body.pagination).toHaveProperty('totalRecords');
          expect(body.pagination).toHaveProperty('currentPage');
          expect(body.pagination).toHaveProperty('totalPages');
          expect(body.pagination).toHaveProperty('nextPage');
          expect(body.pagination).toHaveProperty('prevPage');
        });
    });

    it('should return objects with url and title fields', () => {
      return request(app.getHttpServer())
        .get('/results?q=test')
        .expect(200)
        .expect((res) => {
          const body: PaginatedData<Result> = res.body as PaginatedData<Result>;
          expect(Array.isArray(body.data)).toBeTruthy();
          body.data.forEach((item) => {
            expect(item).toHaveProperty('url');
            expect(item).toHaveProperty('title');
          });
        });
    });
  });
});
