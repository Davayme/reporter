import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, Matches } from 'class-validator';

export class CreateQueryDto {
  @ApiProperty({ description: 'sentencia sql SELECT' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^select/i, { message: 'sentence must start with "select"' })
  sentence: string;

  @ApiProperty({ description: 'id_server al que pertenece' })
  @IsInt()
  @IsNotEmpty()
  id_server: number;
}
