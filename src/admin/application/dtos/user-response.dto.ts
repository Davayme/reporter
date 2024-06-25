// src/admin/application/dtos/user-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsInt, IsNumber } from 'class-validator';

export class UserResponseDto {
  @ApiProperty({description: 'Id del usuario'})
  @IsInt()
  id: number;

  @ApiProperty({description: 'Nombre del usuario'})
  @IsString()
  username: string;

  @ApiProperty({description: 'Correo del usuario'})
  @IsEmail()
  email: string;

  @ApiProperty({description: 'Roles del usuario'})
  @IsString({ each: true})
  role: string[];

  @ApiProperty({description: 'Estado del usuario'})
  @IsBoolean()
  statusActive: boolean;


}
