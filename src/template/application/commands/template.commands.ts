import { CreateTemplateDto } from "../dto/create-template.dto";
import { UpdateTemplateDto } from "../dto/update-template.dto";

export class CreateTemplateCommand {
  constructor(public readonly createTemplateDto: CreateTemplateDto) { }
}

export class UpdateTemplateCommand {
  constructor(public readonly id_template: number, public readonly updateTemplateDto: UpdateTemplateDto
  ) { }
}

export class DeleteTemplateCommand {
  constructor(public readonly id_template: number) { }
}