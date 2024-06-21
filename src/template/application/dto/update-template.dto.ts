import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTemplateDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  queryId: number;

  @IsBoolean()
  @IsOptional()
  statusActive?: boolean;
}
