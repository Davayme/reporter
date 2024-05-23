
import { IsString, IsEmail, IsInt, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  username?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  @IsOptional()
  roleId?: number;

  @IsBoolean()
  @IsOptional()
  statusActive?: boolean;
}
