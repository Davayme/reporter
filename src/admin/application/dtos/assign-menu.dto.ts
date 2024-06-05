import { IsInt, IsString } from 'class-validator';

export class AssignMenuDto {
  @IsInt()
  userId: number;

  @IsString()
  menuName: string;

  @IsInt()
  permissionId: number;
}
