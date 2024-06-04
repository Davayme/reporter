import { IsString, IsInt, IsNotEmpty, Matches } from 'class-validator';

export class CreateQueryDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^select/i, { message: 'sentence must start with "select"' })
  sentence: string;

  @IsInt()
  @IsNotEmpty()
  id_server: number;
}
