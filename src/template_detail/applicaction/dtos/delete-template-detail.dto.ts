import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';

export class DeleteTemplateDetailDto {
  @ApiProperty({ description: 'Id de los detalles de la plantilla' })
  @IsArray()
  @IsInt({ each: true })
  id_details: number[];
}
