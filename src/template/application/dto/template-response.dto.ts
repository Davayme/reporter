import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TemplateDetailResponseDto {
  @IsString()
  field: string;

  @IsString()
  typeField: string;

  @IsString()
  operation: string;
}

class QueryResponseDto {
  @IsString()
  query: string;

  @IsString()
  name: string;

  @IsString()
  type_bd: string;
}

export class TemplateResponseDto {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => QueryResponseDto)
  query: QueryResponseDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateDetailResponseDto)
  templateDetails: TemplateDetailResponseDto[];
}
