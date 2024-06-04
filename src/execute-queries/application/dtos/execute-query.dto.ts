import { IsString, IsInt, Matches } from 'class-validator';

export class ExecuteQueryDto {
  @IsString()
  @Matches(/^select/i, { message: 'query must start with "select"' })
  query: string;

  @IsInt()
  serverId: number;
}

