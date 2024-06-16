import { Inject, Injectable } from "@nestjs/common";
import { DeleteTemplateCommand } from "../commands/template.commands";
import { TemplateRepository } from "src/template/domian/repositories/template.repository";

@Injectable()
export class DeleteTemplateService {
  constructor(
    @Inject('TemplateRepository') private readonly templateRepository: TemplateRepository
  ) {}

  async delete(deleteTemplateCommand: DeleteTemplateCommand): Promise<void> {
    return this.templateRepository.delete(deleteTemplateCommand.id_template);
  }
}