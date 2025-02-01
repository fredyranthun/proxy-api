import { Module } from '@nestjs/common';
import { ParseResultsService } from './parse-results.service';

@Module({
  providers: [ParseResultsService],
  exports: [ParseResultsService],
})
export class ParseResultsModule {}
