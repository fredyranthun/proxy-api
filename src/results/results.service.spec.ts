import { Test, TestingModule } from '@nestjs/testing';
import { ResultsService } from './results.service';
import { SearchService } from '../search/search.service';
import { SearchModule } from 'src/search/search.module';
import { InternalServerErrorException } from '@nestjs/common';

describe('ResultsService', () => {
  let service: ResultsService;
  let searchService: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultsService],
      imports: [SearchModule],
    }).compile();

    service = module.get<ResultsService>(ResultsService);
    searchService = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return results when search service returns data', async () => {
    const mockData = [
      { FirstURL: 'http://example.com', Text: 'Example' },
      {
        Name: 'Category',
        Topics: [{ FirstURL: 'http://example2.com', Text: 'Example2' }],
      },
    ];

    jest.spyOn(searchService, 'fetchResults').mockResolvedValueOnce(mockData);

    const results = await service.getResults('test');
    expect(results).toEqual([
      { url: 'http://example.com', title: 'Example' },
      { url: 'http://example2.com', title: 'Example2' },
    ]);
  });

  it('should return an error result when search service fails', async () => {
    jest.spyOn(searchService, 'fetchResults').mockImplementationOnce(() => {
      throw new Error('Failed to fetch results');
    });

    try {
      await service.getResults('test');
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });
});
