import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsInt()
  id_padre?: number;
}
