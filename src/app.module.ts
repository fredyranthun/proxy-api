import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultsModule } from './results/results.module';
import { SearchModule } from './search/search.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { PaginationModule } from './pagination/pagination.module';
import { ParseResultsModule } from './parse-results/parse-results.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ResultsModule,
    SearchModule,
    CacheModule.register(),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PaginationModule,
    ParseResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
