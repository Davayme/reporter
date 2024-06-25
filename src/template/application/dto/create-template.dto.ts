import { IsString, IsBoolean, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CreateTemplateDetailDto {
  @ApiProperty({ description: 'Nombre del campo' })
  @IsString()
  field: string;

  @ApiProperty({ description: 'Tipo de campo' })
  @IsString()
  typeField: string;

  @ApiProperty({ description: 'Estado del campo' })
  @IsBoolean()
  statusActive: boolean;

  @ApiProperty({ description: 'Operación del campo' })
  @IsString()
  operation: string;
}

export class CreateTemplateDto {
  @ApiProperty({ description: 'Nombre del template' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID de la consulta' })
  @IsInt()
  queryId: number;

  @ApiProperty({ description: 'Estado del template' })
  @IsBoolean()
  statusActive: boolean;

  @ApiProperty({ description: 'Detalles del template' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTemplateDetailDto)
  templateDetails: CreateTemplateDetailDto[];
}
