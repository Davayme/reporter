import { Inject, Injectable } from "@nestjs/common";
import { UpdateTemplateDetailsCommand } from "../commands/template-detail.command";
import { Template_Detail } from "@prisma/client";
import { TemplateDetailRepository } from "src/template_detail/domain/repositories/template-detail.repository";

@Injectable()
export class UpdateTemplateDetailsService {
  constructor(
    @Inject('TemplateDetailRepository') private readonly templateDetailRepository: TemplateDetailRepository
  ) {}

  async update(command: UpdateTemplateDetailsCommand): Promise<Template_Detail[]> {
    const { templateDetails } = command;
    return this.templateDetailRepository.updateMany(templateDetails);
  }
}