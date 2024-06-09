import { IsArray, IsInt } from 'class-validator';

export class DeleteTemplateDetailDto {
  @IsArray()
  @IsInt({ each: true })
  id_details: number[];
}
