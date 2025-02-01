import { Injectable } from '@nestjs/common';
import { Result } from 'src/results/result.interface';
import { Category } from 'src/search/category.interface';
import { Topic } from 'src/search/topic.interface';

@Injectable()
export class ParseResultsService {
  parse(data: (Topic | Category)[]): Result[] {
    return data.flatMap((item: Topic | Category) => {
      if ('Topics' in item) {
        return this.parse(item.Topics);
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
