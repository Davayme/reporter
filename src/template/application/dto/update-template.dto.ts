import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTemplateDto {
  @ApiProperty({ description: 'Nombre del template' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'ID de la consulta' })
  @IsInt()
  @IsOptional()
  queryId: number;

  @ApiProperty({ description: 'Estado del template' })
  @IsBoolean()
  @IsOptional()
  statusActive?: boolean;
}
