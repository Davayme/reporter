import { ApiProperty } from '@nestjs/swagger';
import {IsEnum, IsNumber } from 'class-validator';

enum TemplateType {
  LIST = 'list',
  FINANCIAL = 'financial',
}

export class ExecuteTemplateDto {
  @ApiProperty({ description: 'ID del template' })
  @IsNumber()
  id_template: number;

  @ApiProperty({ description: 'Tipo de template', enum: TemplateType })
  @IsEnum(TemplateType)
  type_template: TemplateType;
}