import { PartialType } from '@nestjs/mapped-types';
import { CreateDatabaseConnectionDto } from './create-database-connection.dto';

export class UpdateDatabaseConnectionDto extends PartialType(CreateDatabaseConnectionDto) {}
