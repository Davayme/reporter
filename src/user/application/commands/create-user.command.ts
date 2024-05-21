// src/user/application/commands/create-user.command.ts
import { CreateUserDto } from '../dtos/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly userDto: CreateUserDto) {}
}
