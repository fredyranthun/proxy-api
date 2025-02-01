import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('SearchService', () => {
  let service: SearchService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
      imports: [HttpModule],
    }).compile();

    service = module.get<SearchService>(SearchService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch results from the search API', async () => {
    // Arrange
    const mockData = {
      RelatedTopics: [
        {
          Text: 'Example',
          FirstURL: 'http://example.com',
        },
      ],
    };

    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(of({ data: mockData } as AxiosResponse));

    // Act
    const results = await service.fetchResults('test');

    // Assert
    expect(results).toEqual([
      { Text: 'Example', FirstURL: 'http://example.com' },
    ]);
  });

  it('should handle errors when fetching results', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(
        of(new Error('Test error')) as unknown as Observable<AxiosResponse>,
      );

    try {
      await service.fetchResults('test');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as unknown as { message: string }).message).toBe(
        'Failed to fetch results',
      );
    }
  });
});
