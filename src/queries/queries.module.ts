/* import { Module } from '@nestjs/common';
import { DatabaseService } from './queries.service';
import { DatabaseController } from './queries.controller';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class QueriesModule {}
 */

import { Module } from '@nestjs/common';
import { QueryController } from './infraestructure/controllers/querycontrollers';
import { GetQueriesByServerIdService } from './application/services/get-queries-by-server.service';
import { PrismaQueryRepository } from './infraestructure/repositories/prisma-query.repository';
import { CreateQueryService } from './application/services/create-query.service';
@Module({
  controllers: [QueryController],
  providers: [
    {
      provide: 'QueryRepository',
      useClass: PrismaQueryRepository,
    },
    GetQueriesByServerIdService,
    CreateQueryService,
  ],
  exports: [GetQueriesByServerIdService, CreateQueryService],
})
export class QueriesModule {}
