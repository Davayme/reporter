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

/*   @Get('change/:dbName')
  async changeConnection(@Param('dbName') dbName: string): Promise<string> {
    return this.databaseService.changeConnection(dbName);
  }
 */
  /* @Get('query/:query')
  async executeQuery(@Param('query') query: string) {
    return this.databaseService.executeQuery(query);
  }*/
} 