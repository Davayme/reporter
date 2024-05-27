// src/server/application/dtos/update-server.dto.ts
import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class UpdateServerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  string_url?: string;

  @IsString()
  @IsOptional()
  user?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  type_bd?: string;

  @IsInt()
  @IsOptional()
  port?: number;

  @IsBoolean()
  @IsOptional()
  statusActive?: boolean;
}
