import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';
import { Result } from './result.interface';
import { ParseResultsService } from 'src/parse-results/parse-results.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginatedData } from 'src/pagination/paginated-data.interface';

@Injectable()
export class ResultsService {
  constructor(
    private readonly searchService: SearchService,
    private readonly parseResultsService: ParseResultsService,
    private readonly paginationService: PaginationService,
  ) {}

  async getResults(
    query: string,
    page: number,
    size: number,
  ): Promise<PaginatedData<Result>> {
    try {
      const data = await this.searchService.fetchResults(query);
      const parsedData = this.parseResultsService.parse(data);
      const paginatedData = this.paginationService.paginate(
        parsedData,
        page,
        size,
      );

      return paginatedData;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to fetch results');
    }
  }
}
