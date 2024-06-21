import { Injectable, Inject } from '@nestjs/common';
import { TemplateRepository } from 'src/template/domian/repositories/template.repository';
import { CreateTemplateCommand } from '../commands/template.commands';
import { FieldType, OperationType, Template, Template_Detail } from '@prisma/client';

@Injectable()
export class CreateTemplateService {
  constructor(
    @Inject('TemplateRepository') private readonly templateRepository: TemplateRepository
  ) {}

  async create(createTemplateCommand: CreateTemplateCommand): Promise<Template> {
    const { createTemplateDto } = createTemplateCommand;

    const template: Omit<Template, 'id_template'> = {
      name: createTemplateDto.name,
      queryId: createTemplateDto.queryId,
      statusActive: createTemplateDto.statusActive,
    };

    const details: Omit<Template_Detail, 'id_detail'>[] = createTemplateDto.templateDetails.map(detail => ({
      field: detail.field,
      typeField: detail.typeField as FieldType,
      statusActive: detail.statusActive,
      operation: detail.operation as OperationType, // Nuevo campo para la operación
      templateId: 0, // Se asignará automáticamente en la relación
    }));

    return this.templateRepository.create(template, details);
  }
}