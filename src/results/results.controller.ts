import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('results')
@UseInterceptors(CacheInterceptor)
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  async getResults(@Query('q') query: string) {
    if (!query) {
      throw new BadRequestException("Query parameter 'q' is required");
    }

    return this.resultsService.getResults(query);
  }
}
