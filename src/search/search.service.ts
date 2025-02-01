import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, catchError, throwError, lastValueFrom } from 'rxjs';

export interface Category {
  Name: string;
  Topics: Topic[];
}

export interface Topic {
  FirstURL?: string;
  Text?: string;
}

export interface ApiResponse {
  RelatedTopics: (Topic | Category)[];
}

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  fetchResults(query: string): Promise<(Topic | Category)[]> {
    return lastValueFrom(
      this.httpService
        .get<ApiResponse>('http://api.duckduckgo.com/', {
          params: {
            q: query,
            format: 'json',
          },
        })
        .pipe(
          map((response: { data: ApiResponse }) => response.data.RelatedTopics),
          catchError(() =>
            throwError(() => new Error('Failed to fetch results')),
          ),
        ),
    );
  }
}
