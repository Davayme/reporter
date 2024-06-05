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
import { UpdateQueryService } from './application/services/update-query.service';
import { DeleteQueryService } from './application/services/delete-query.service';
import { GetQueries } from './application/services/getAll-query.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [QueryController],
  providers: [
    {
      provide: 'QueryRepository',
      useClass: PrismaQueryRepository,
    },
    GetQueries,
    GetQueriesByServerIdService,
    CreateQueryService,
    UpdateQueryService,
    DeleteQueryService
  ],
  exports: [GetQueries,GetQueriesByServerIdService, CreateQueryService, UpdateQueryService, DeleteQueryService],
})
export class QueriesModule {}
