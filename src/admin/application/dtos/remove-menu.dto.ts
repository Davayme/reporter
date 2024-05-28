import { IsInt, IsString } from 'class-validator';

export class RemoveMenuDto {
  @IsInt()
  userId: number;

  @IsString()
  menuName: string;
}
