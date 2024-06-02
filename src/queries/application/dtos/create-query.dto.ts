import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateQueryDto {
  @IsString()
  @IsNotEmpty()
  sentence: string;

  @IsInt()
  @IsNotEmpty()
  id_server: number;
}
