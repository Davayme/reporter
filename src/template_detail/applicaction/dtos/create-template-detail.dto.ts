import { IsString, IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';
import { FieldType, OperationType } from '@prisma/client';

export class CreateTemplateDetailDto {
  @IsString()
  @IsNotEmpty()
  field: string;

  @IsEnum(FieldType)
  typeField: FieldType;

  @IsBoolean()
  statusActive: boolean;

  @IsEnum(OperationType)
  operation: OperationType;
}

export class CreateTemplateDetailsDto {
  @IsNotEmpty()
  templateDetails: CreateTemplateDetailDto[];
}
