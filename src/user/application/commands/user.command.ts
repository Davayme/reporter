import { UpdateUserDto } from '../dtos/update-user.dto';

export class UpdateUserCommand {
  constructor(public readonly username: string, public readonly userDto: UpdateUserDto) {}
}