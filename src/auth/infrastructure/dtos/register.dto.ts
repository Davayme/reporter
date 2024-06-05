import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
  
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly roleId: number;

}
