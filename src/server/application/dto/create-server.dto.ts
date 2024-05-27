import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateServerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  string_url: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  type_bd: string;

  @IsInt()
  @IsNotEmpty()
  port: number;
}

