import { IsString, IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';
import { FieldType, OperationType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplateDetailDto {
  @ApiProperty({  description: 'Nombre del campo'})
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty({ description: 'Tipo de campo' })
  @IsEnum(FieldType)
  typeField: FieldType;

  @ApiProperty({ description: 'Estado del campo' })
  @IsBoolean()
  statusActive: boolean;

  @ApiProperty({ description: 'Operación del campo' })
  @IsEnum(OperationType)
  operation: OperationType;
}

export class CreateTemplateDetailsDto {
  @ApiProperty({ description: 'Detalles del template' })
  @IsNotEmpty()
  templateDetails: CreateTemplateDetailDto[];
}
