import { UpdateUserDto } from '../dtos/update-user.dto';

export class GetAllUsersCommand {}

export class UpdateUserCommand {
  constructor(public readonly id: number, public readonly userDto: UpdateUserDto) {}
}

export class DeleteUserCommand {
  constructor(public readonly id: number) {}
}
