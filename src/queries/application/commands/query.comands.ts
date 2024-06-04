import { CreateQueryDto } from '../dtos/create-query.dto';
import { UpdateQueryDto } from '../dtos/update-query.dto';

export class CreateQueryCommand {
  constructor(public readonly createQueryDto: CreateQueryDto) {}
}

export class UpdateQueryCommand {
  constructor(public readonly id: number, public readonly updateQueryDto: UpdateQueryDto) {}
}

export class DeleteQueryCommand {
  constructor(public readonly id: number) {}
}