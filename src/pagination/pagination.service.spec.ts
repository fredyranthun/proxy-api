import { Test, TestingModule } from '@nestjs/testing';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;
  const generateData = (length: number) =>
    Array.from({ length }, (_, i) => ({ id: i + 1 }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationService],
    }).compile();

    service = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should paginate data correctly', () => {
    const data = generateData(100);
    const page = 2;
    const size = 10;

    const result = service.paginate(data, page, size);

    expect(result.data.length).toBe(size);
    expect(result.data[0].id).toBe(11);
    expect(result.data[9].id).toBe(20);
    expect(result.pagination.totalRecords).toBe(100);
    expect(result.pagination.currentPage).toBe(page);
    expect(result.pagination.totalPages).toBe(10);
    expect(result.pagination.nextPage).toBe(3);
    expect(result.pagination.prevPage).toBe(1);
  });

  it('should handle pagination with size larger than data length', () => {
    const data = generateData(5);
    const page = 1;
    const size = 10;

    const result = service.paginate(data, page, size);

    expect(result.data.length).toBe(5);
    expect(result.pagination.totalRecords).toBe(5);
    expect(result.pagination.currentPage).toBe(page);
    expect(result.pagination.totalPages).toBe(1);
    expect(result.pagination.nextPage).toBeNull();
    expect(result.pagination.prevPage).toBeNull();
  });

  it('should handle pagination with empty data', () => {
    const data = [];
    const page = 1;
    const size = 10;

    const result = service.paginate(data, page, size);

    expect(result.data.length).toBe(0);
    expect(result.pagination.totalRecords).toBe(0);
    expect(result.pagination.currentPage).toBe(page);
    expect(result.pagination.totalPages).toBe(0);
    expect(result.pagination.nextPage).toBeNull();
    expect(result.pagination.prevPage).toBeNull();
  });
});
