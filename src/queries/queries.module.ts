import { Module } from '@nestjs/common';
import { DatabaseService } from './queries.service';
import { DatabaseController } from './queries.controller';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class QueriesModule {}
