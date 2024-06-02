import { IsString, IsOptional } from 'class-validator';

export class UpdateQueryDto {
  @IsString()
  @IsOptional()
  sentence?: string;
}
