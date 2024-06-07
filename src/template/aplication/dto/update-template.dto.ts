import { IsString, IsBoolean, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateTemplateDetailDto {
  @IsInt()
  id_detail: number;

  @IsString()
  field: string;

  @IsString()
  typeField: string;

  @IsBoolean()
  statusActive: boolean;
}

export class UpdateTemplateDto {
  @IsString()
  name: string;

  @IsInt()
  queryId: number;

  @IsBoolean()
  statusActive: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTemplateDetailDto)
  templateDetails: UpdateTemplateDetailDto[];
}
