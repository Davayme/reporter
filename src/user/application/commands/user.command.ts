// src/user/application/commands/create-user.command.ts
import { CreateUserDto} from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class CreateUserCommand {
  constructor(public readonly userDto: CreateUserDto) {}
}

export class UpdateUserCommand {
  constructor(public readonly id: number, public readonly userDto: UpdateUserDto) {}
}