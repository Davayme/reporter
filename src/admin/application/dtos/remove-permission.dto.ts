import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RemovePermissionDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  menuName: string;

  @IsInt()
  @IsNotEmpty()
  permissionId: number;
}
