import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsOptional()
  @IsInt()
  id_padre?: number;
}
