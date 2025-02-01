import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { SearchModule } from 'src/search/search.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    SearchModule,
    CacheModule.register({
      ttl: 10 * 1000, // Time to live: 10 seconds
    }),
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
