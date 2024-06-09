import { IsString, IsEnum } from 'class-validator';

enum TemplateType {
  LIST = 'list',
  FINANCIAL = 'financial',
}

export class ExecuteTemplateDto {
  @IsString()
  id_template: string;

  @IsEnum(TemplateType)
  type_template: TemplateType;
}