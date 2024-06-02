import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { DatabaseService } from './queries.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('connect')
  async connect(): Promise<string> {
    return this.databaseService.connect();
  }

  @Get('execute')

async executeQuery(@Body('query') query: string): Promise<any> {
    return this.databaseService.executeQuery(query);
  }


} 