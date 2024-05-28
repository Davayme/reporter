import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AssignPermissionDto {
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
