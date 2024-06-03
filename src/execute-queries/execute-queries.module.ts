import { Module } from '@nestjs/common';
import { ExecuteQueryController } from './infraestructure/controllers/execute-query.controller';
import { ExecuteQueryService } from './application/services/execute-query.service';
import { DatabaseService } from './infraestructure/knex-service/database.service';
import { PrismaServerRepository } from './infraestructure/repositories/prisma-server.repository';


@Module({
  controllers: [ExecuteQueryController],
  providers: [
    ExecuteQueryService,
    DatabaseService,
    {
      provide: 'ServerRepository',
      useClass: PrismaServerRepository
    }
  ],
  exports: [ExecuteQueryService, DatabaseService]
})
export class ExecuteQueriesModule {}
