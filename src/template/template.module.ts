import { Delete, Module } from '@nestjs/common';
import { TemplateController } from './infraestructure/controllers/template.controller';
import { GetAllTemplateService } from './application/services/getAll-template.service';
import { PrismaTemplateRepository } from './infraestructure/repositories/prisma-template.repository';
import { CreateTemplateService } from './application/services/create-template.service';
import { UpdateTemplateService } from './application/services/update-template.service';
import { DeleteTemplateService } from './application/services/delete-template.service';


@Module({
  controllers: [TemplateController],
  providers: [
    GetAllTemplateService,
    CreateTemplateService,
    UpdateTemplateService,
    DeleteTemplateService,
    {
      provide: 'TemplateRepository',
      useClass: PrismaTemplateRepository,
    },
  ],
  exports: [GetAllTemplateService, CreateTemplateService , UpdateTemplateService, DeleteTemplateService],
})
export class TemplateModule {}
