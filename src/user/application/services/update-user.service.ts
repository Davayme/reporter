import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UpdateUserCommand } from '../commands/user.command';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.userRepository.findByUsername(command.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { email } = command.userDto;
    if (email && email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email is already registered');
      }
    }

    await this.userRepository.update(user.id, command.userDto);
  }
}
