import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsBoolean, IsEnum } from 'class-validator';

enum DbType {
  mysql = 'mysql',
  pg = 'pg',
  oracle = 'oracle',
  sqlserver = 'sqlserver'
}

export class CreateServerDto {
  @ApiProperty({ description: 'Nombre del servidor' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Usuario del servidor' })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ description: 'URL del servidor' })
  @IsString()
  @IsNotEmpty()
  string_url: string;

  @ApiProperty({ description: 'Contraseña del servidor' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Nombre de la base de datos a conectarse' })
  @IsString()
  @IsNotEmpty()
  database: string;

  @ApiProperty({ description: 'Tipo de base de datos' })
  @IsEnum(DbType)
  type_bd: DbType;

  @ApiProperty({ description: 'Puerto del servidor' })
  @IsInt()
  @IsNotEmpty()
  port: number;

  @ApiProperty({ description: 'SSL del servidor' })
  @IsBoolean()
  @IsOptional()
  ssl: boolean;

  @ApiProperty({ description: 'Descripción opcional del servidor' })
  @IsString()
  @IsOptional()
  description: string;
}
