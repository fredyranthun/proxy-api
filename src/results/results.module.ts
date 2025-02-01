import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { SearchModule } from 'src/search/search.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ParseResultsModule } from 'src/parse-results/parse-results.module';
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  imports: [
    SearchModule,
    ParseResultsModule,
    PaginationModule,
    CacheModule.register({
      ttl: 10 * 1000, // Time to live: 10 seconds
    }),
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
