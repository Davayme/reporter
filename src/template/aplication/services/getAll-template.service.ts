import { Injectable, Inject } from '@nestjs/common';
import { TemplateRepository } from 'src/template/domian/repositories/template.repository';
import { TemplateResponseDto } from '../dto/template-response.dto';
import { Template, Query, Server, Template_Detail } from '@prisma/client';

@Injectable()
export class GetAllTemplateService {
  constructor(
    @Inject('TemplateRepository') private readonly templateRepository: TemplateRepository
  ) {}

  async findAll(): Promise<TemplateResponseDto[]> {
    const templates = await this.templateRepository.findAll();

    return templates.map(template => ({
      id_template: template.id_template,
      name: template.name,
      query: {
        query: template.query.sentence,
        name: template.query.Server.name,
        type_bd: template.query.Server.type_bd,
      },
      templateDetails: template.templateDetails.map(detail => ({
        id_detail: detail.id_detail,
        field: detail.field,
        typeField: detail.typeField,
      })),
    }));
  }
}
