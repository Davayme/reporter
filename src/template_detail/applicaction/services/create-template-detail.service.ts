import { Inject, Injectable } from "@nestjs/common";
import { CreateTemplateDetailsCommand } from "../commands/template-detail.command";
import { Template_Detail } from "@prisma/client";
import { TemplateDetailRepository } from "src/template_detail/domain/repositories/template-detail.repository";

@Injectable()
export class CreateTemplateDetailsService {
  constructor(
    @Inject('TemplateDetailRepository') private readonly templateDetailRepository: TemplateDetailRepository
  ) {}

  async create(command: CreateTemplateDetailsCommand): Promise<Template_Detail[]> {
    const { createTemplateDetailsDto, templateId } = command;

    const details: Omit<Template_Detail, 'id_detail'>[] = createTemplateDetailsDto.map(detail => ({
      field: detail.field,
      typeField: detail.typeField,
      statusActive: detail.statusActive,
      operation: detail.operation,
      templateId,
    }));

    return this.templateDetailRepository.createMany(details);
  }
}