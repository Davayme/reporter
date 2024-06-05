// src/admin/application/dtos/assign-role.dto.ts
import { IsInt, IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class AssignRoleDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  roleIds: number[];
}
