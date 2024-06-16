import { IsString, IsEnum, IsNumber } from 'class-validator';

enum TemplateType {
  LIST = 'list',
  FINANCIAL = 'financial',
}

export class ExecuteTemplateDto {
  @IsNumber()
  id_template: number;

  @IsEnum(TemplateType)
  type_template: TemplateType;
}