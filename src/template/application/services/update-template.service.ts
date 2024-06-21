import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TemplateRepository } from 'src/template/domian/repositories/template.repository';
import { UpdateTemplateCommand } from '../commands/template.commands';
import { Template, Template_Detail, FieldType, OperationType } from '@prisma/client';

@Injectable()
export class UpdateTemplateService {
  constructor(
    @Inject('TemplateRepository') private readonly templateRepository: TemplateRepository
  ) {}

  async update(updateTemplateCommand: UpdateTemplateCommand): Promise<Template> {
    const { updateTemplateDto } = updateTemplateCommand;

    const template: Omit<Template, 'id_template'> = {
      name: updateTemplateDto.name,
      queryId: updateTemplateDto.queryId,
      statusActive: updateTemplateDto.statusActive ?? true,
    };

    const existingTemplate = await this.templateRepository.findById(updateTemplateCommand.id_template);
    if (!existingTemplate) {
      throw new NotFoundException(`Template with ID ${updateTemplateCommand.id_template} not found.`);
    }

    return this.templateRepository.update(updateTemplateCommand.id_template, template);
  }
}
