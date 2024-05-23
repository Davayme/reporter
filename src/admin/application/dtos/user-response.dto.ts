// src/admin/application/dtos/user-response.dto.ts
import { IsString, IsEmail, IsBoolean, IsInt, IsNumber } from 'class-validator';

export class UserResponseDto {
  @IsInt()
  id: number;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNumber()
  role: number;

  @IsBoolean()
  statusActive: boolean;


}
