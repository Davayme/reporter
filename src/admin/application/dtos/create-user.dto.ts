// src/user/application/dtos/create-user.dto.ts
import { IsString, IsEmail, IsInt, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsInt()
  roleId: number;
}
