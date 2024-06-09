import { Module } from '@nestjs/common';
import { TemplateDetailController } from './infraestructure/controllers/template_detail.controller';
import { CreateTemplateDetailsService } from './applicaction/services/create-template-detail.service';
import { PrismaTemplateDetailRepository } from './infraestructure/repositories/prisma-template-detail.repository';
import { UpdateTemplateDetailsService } from './applicaction/services/update-template-details.service';
import { DeleteTemplateDetailService } from './applicaction/services/delete-template-detail.service';

@Module({
  controllers: [TemplateDetailController],
  providers: [
    CreateTemplateDetailsService,
    UpdateTemplateDetailsService,
    DeleteTemplateDetailService,
    {
      provide: 'TemplateDetailRepository', useClass: PrismaTemplateDetailRepository
    }
  ],
  exports: [CreateTemplateDetailsService, UpdateTemplateDetailsService, DeleteTemplateDetailService],
})
export class TemplateDetailModule { }
