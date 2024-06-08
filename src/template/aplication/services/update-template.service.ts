import { Injectable, Inject } from '@nestjs/common';
import { TemplateRepository } from 'src/template/domian/repositories/template.repository';
import { UpdateTemplateCommand } from '../commands/template.commands';
import { Template, Template_Detail, FieldType, OperationType } from '@prisma/client';

@Injectable()
export class UpdateTemplateService {
  constructor(
    @Inject('TemplateRepository') private readonly templateRepository: TemplateRepository
  ) {}

  async update(id_template: number, updateTemplateCommand: UpdateTemplateCommand): Promise<Template> {
    const { updateTemplateDto } = updateTemplateCommand;

    const template: Omit<Template, 'id_template'> = {
      name: updateTemplateDto.name,
      queryId: updateTemplateDto.queryId,
      statusActive: updateTemplateDto.statusActive,
    };

    const details: Omit<Template_Detail, 'id_detail'>[] = updateTemplateDto.templateDetails.map(detail => ({
      id_detail: detail.id_detail,
      field: detail.field,
      typeField: detail.typeField as FieldType,
      statusActive: detail.statusActive,
      operation: detail.operation as OperationType, // Nuevo campo para la operación
      templateId: id_template,
    }));

    return this.templateRepository.update(id_template, template, details);
  }
}
