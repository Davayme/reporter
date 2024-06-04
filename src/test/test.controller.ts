import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatabaseService } from './test.service';


@Controller('test')
export class TestController {
  constructor(private readonly testService: DatabaseService) {}

  @Get()
  async connect(): Promise<string> {
    return this.testService.connect();
  }
  @Get('query')
  async executeQuery(@Body('query') query: string): Promise<any> {
    return this.testService.executeQuery(query);
  }
}
