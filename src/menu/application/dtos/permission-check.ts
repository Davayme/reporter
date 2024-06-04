import { IsInt, IsString } from 'class-validator';

export class PermissionCheckDto {
  @IsInt()
  userId: number;

  @IsInt()
  menuId: number;
}
