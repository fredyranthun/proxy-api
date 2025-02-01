import { Test, TestingModule } from '@nestjs/testing';
import { ParseResultsService } from './parse-results.service';
import { Topic } from 'src/search/topic.interface';
import { Category } from 'src/search/category.interface';

describe('ParseResultsService', () => {
  let service: ParseResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParseResultsService],
    }).compile();

    service = module.get<ParseResultsService>(ParseResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse flat topics correctly', () => {
    const data: Topic[] = [
      { FirstURL: 'http://example.com', Text: 'Example' },
      { FirstURL: 'http://example2.com', Text: 'Example2' },
    ];

    const result = service.parse(data);

    expect(result).toEqual([
      { url: 'http://example.com', title: 'Example' },
      { url: 'http://example2.com', title: 'Example2' },
    ]);
  });

  it('should parse nested topics correctly', () => {
    const data: (Topic | Category)[] = [
      {
        Name: 'Category',
        Topics: [
          { FirstURL: 'http://example.com', Text: 'Example' },
          { FirstURL: 'http://example2.com', Text: 'Example2' },
        ],
      },
    ];

    const result = service.parse(data);

    expect(result).toEqual([
      { url: 'http://example.com', title: 'Example' },
      { url: 'http://example2.com', title: 'Example2' },
    ]);
  });

  it('should handle empty data', () => {
    const data: (Topic | Category)[] = [];

    const result = service.parse(data);

    expect(result).toEqual([]);
  });

  it('should handle mixed data', () => {
    const data: (Topic | Category)[] = [
      { FirstURL: 'http://example.com', Text: 'Example' },
      {
        Name: 'Category',
        Topics: [
          { FirstURL: 'http://example2.com', Text: 'Example2' },
          { FirstURL: 'http://example3.com', Text: 'Example3' },
        ],
      },
    ];

    const result = service.parse(data);

    expect(result).toEqual([
      { url: 'http://example.com', title: 'Example' },
      { url: 'http://example2.com', title: 'Example2' },
      { url: 'http://example3.com', title: 'Example3' },
    ]);
  });
});
