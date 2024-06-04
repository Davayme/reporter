import { IsString, IsOptional, Matches } from 'class-validator';

export class UpdateQueryDto {
  @IsString()
  @IsOptional()
  @Matches(/^select/i, { message: 'sentence must start with "select"' })
  sentence?: string;
}
