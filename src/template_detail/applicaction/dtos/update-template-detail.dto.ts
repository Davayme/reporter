import { IsOptional, IsString, IsEnum, IsBoolean, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { FieldType, OperationType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTemplateDetailDto {
  @ApiProperty({ description: 'Id del detalle de la plantilla' })
  @IsInt()
  id_detail: number;

  @ApiProperty({ description: 'Nombre del campo' })
  @IsOptional()
  @IsString()
  field?: string;

  @ApiProperty({ description: 'Tipo de campo' })
  @IsOptional()
  @IsEnum(FieldType)
  typeField?: FieldType;

  @ApiProperty({ description: 'Estado del campo' })
  @IsOptional()
  @IsBoolean()
  statusActive?: boolean;

  @ApiProperty({ description: 'Operación del campo' })
  @IsOptional()
  @IsEnum(OperationType)
  operation?: OperationType;
}

export class UpdateTemplateDetailsDto {
  @ApiProperty({ description: 'Detalles de la plantilla' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTemplateDetailDto)
  templateDetails: UpdateTemplateDetailDto[];
}
