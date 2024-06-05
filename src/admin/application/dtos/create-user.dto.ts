// src/admin/application/dtos/create-user.dto.ts
import { IsString, IsEmail, IsInt, MinLength, IsOptional, IsBoolean, IsArray, ArrayMinSize } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  @IsInt({ each: true })
  roleIds?: number[];

  @IsBoolean()
  @IsOptional()
  statusActive?: boolean;

}
