import { IsOptional, IsString, IsEnum, IsBoolean, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { FieldType, OperationType } from '@prisma/client';

export class UpdateTemplateDetailDto {
  @IsInt()
  id_detail: number;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  @IsEnum(FieldType)
  typeField?: FieldType;

  @IsOptional()
  @IsBoolean()
  statusActive?: boolean;

  @IsOptional()
  @IsEnum(OperationType)
  operation?: OperationType;
}

export class UpdateTemplateDetailsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTemplateDetailDto)
  templateDetails: UpdateTemplateDetailDto[];
}
