import { IsString, IsBoolean, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateTemplateDetailDto {
  @IsString()
  field: string;

  @IsString()
  typeField: string;

  @IsBoolean()
  statusActive: boolean;

  @IsString()
  operation: string;
}

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsInt()
  queryId: number;

  @IsBoolean()
  statusActive: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTemplateDetailDto)
  templateDetails: CreateTemplateDetailDto[];
}
