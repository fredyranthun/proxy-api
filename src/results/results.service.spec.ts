import { Test, TestingModule } from '@nestjs/testing';
import { ResultsService } from './results.service';
import { SearchService } from '../search/search.service';
import { PaginationService } from '../pagination/pagination.service';
import { ParseResultsService } from 'src/parse-results/parse-results.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('ResultsService', () => {
  let service: ResultsService;
  let searchService: SearchService;
  let parseResultsService: ParseResultsService;
  let paginationService: PaginationService;

  beforeEach(async () => {
    const mockSearchService = {
      fetchResults: jest.fn(),
    };
    const mockParseResultsService = {
      parse: jest.fn(),
    };
    const mockPaginationService = {
      paginate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultsService,
        { provide: SearchService, useValue: mockSearchService },
        { provide: ParseResultsService, useValue: mockParseResultsService },
        { provide: PaginationService, useValue: mockPaginationService },
      ],
    }).compile();

    service = module.get<ResultsService>(ResultsService);
    searchService = module.get<SearchService>(SearchService);
    parseResultsService = module.get<ParseResultsService>(ParseResultsService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return paginated results when search service returns data', async () => {
    const mockData = [
      { FirstURL: 'http://example.com', Text: 'Example' },
      { FirstURL: 'http://example2.com', Text: 'Example2' },
    ];
    const parsedData = [
      { url: 'http://example.com', title: 'Example' },
      { url: 'http://example2.com', title: 'Example2' },
    ];
    const paginatedData = {
      data: parsedData,
      pagination: {
        totalRecords: 2,
        currentPage: 1,
        totalPages: 1,
        nextPage: null,
        prevPage: null,
      },
    };

    jest.spyOn(searchService, 'fetchResults').mockResolvedValue(mockData);
    jest.spyOn(parseResultsService, 'parse').mockReturnValue(parsedData);
    jest.spyOn(paginationService, 'paginate').mockReturnValue(paginatedData);

    const results = await service.getResults('test', 1, 10);
    expect(results).toEqual(paginatedData);
  });

  it('should return an error result when search service fails', async () => {
    jest
      .spyOn(searchService, 'fetchResults')
      .mockRejectedValue(new Error('Failed to fetch results'));

    try {
      await service.getResults('test', 1, 10);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
      expect((error as unknown as { message: string }).message).toBe(
        'Failed to fetch results',
      );
    }
  });
});
