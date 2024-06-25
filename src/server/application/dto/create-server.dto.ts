import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsBoolean, IsEnum } from 'class-validator';

enum DbType {
  mysql = 'mysql',
  pg = 'pg',
  oracle = 'oracle',
  sqlserver = 'sqlserver'
}

export class CreateServerDto {
  @ApiProperty({ description: 'El ID del ejemplo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  string_url: string;

  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  database: string;

  @IsEnum(DbType)
  type_bd: DbType;

  @IsInt()
  @IsNotEmpty()
  port: number;

  @IsBoolean()
  @IsOptional()
  ssl: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
