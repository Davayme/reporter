import { IsString, IsInt, IsOptional, IsBoolean, IsEnum } from 'class-validator';

enum DbType {
  mysql = 'mysql',
  pg = 'pg',
  oracle = 'oracle',
  sqlserver = 'sqlserver'
}

export class UpdateServerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  user?: string;

  @IsString()
  @IsOptional()
  string_url?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  database?: string;

  @IsEnum(DbType)
  @IsOptional()
  type_bd?: DbType;

  @IsInt()
  @IsOptional()
  port?: number;

  @IsBoolean()
  @IsOptional()
  ssl?: boolean;

  @IsString()
  @IsOptional()
  description?: string;
}