import { Module } from '@nestjs/common';
import { DatabaseService } from './test.service';
import { TestController } from './test.controller';

@Module({
  controllers: [TestController],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class TestModule {}
