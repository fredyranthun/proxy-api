import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RetrieveResultsDto } from './retrieve-results.dto';

@Controller('results')
@UseInterceptors(CacheInterceptor)
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  private defaultSize = 10;

  @Get()
  async getResults(
    @Query('q') query: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    if (!query) {
      throw new BadRequestException("Query parameter 'q' is required");
    }

    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedSize = size ? parseInt(size, 10) : this.defaultSize;

    return this.resultsService.getResults(query, parsedPage, parsedSize);
  }

  @Post()
  async retrieveResults(@Body() body: RetrieveResultsDto) {
    console.log(body);
    return this.resultsService.getResults(body.query, body.page, body.size);
  }
}
