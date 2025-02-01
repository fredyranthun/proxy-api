import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Category, SearchService, Topic } from 'src/search/search.service';

export interface Result {
  url: string;
  title: string;
}

@Injectable()
export class ResultsService {
  constructor(private readonly searchService: SearchService) {}

  async getResults(query: string): Promise<Result[]> {
    try {
      const data = await this.searchService.fetchResults(query);
      const results = this.extractTopics(data);
      return results;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to fetch results');
    }
  }

  private extractTopics(data: (Topic | Category)[]): Result[] {
    return data.flatMap((item: Topic | Category) => {
      if ('Topics' in item) {
        return this.extractTopics(item.Topics);
      } else if (item.FirstURL && item.Text) {
        return {
          url: item.FirstURL,
          title: item.Text,
        };
      }
      return [];
    });
  }
}
