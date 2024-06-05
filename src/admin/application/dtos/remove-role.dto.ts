// src/admin/application/dtos/remove-role.dto.ts
import { IsInt, IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class RemoveRoleDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  roleIds: number[];
}
