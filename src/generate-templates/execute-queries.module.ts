import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { KnexService } from './infraestructure/knex-service/knex.service';
import { ExecuteTemplateService } from './application/services/execute-template.service';
import { PrismaTemplateRepository } from './infraestructure/repositories/prisma-template.repository';
import { PrismaClient } from '@prisma/client';
import { ExecuteQueryController } from './infraestructure/controllers/execute-template.controller';


@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ExecuteQueryController],
  providers: [
    ExecuteTemplateService,
    KnexService,

    {
      provide: 'GenerateTemplateRepository',
      useClass: PrismaTemplateRepository,
    },
  ],
  exports: [ExecuteTemplateService, KnexService]
})
export class GenerateTemplateModule {}
