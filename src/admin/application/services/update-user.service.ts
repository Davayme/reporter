// src/user/application/services/update-user.service.ts
import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/admin.repository';
import { UpdateUserCommand } from '../commands/admin.command';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { username, email } = command.userDto;
    if (username && username !== user.username) {
      const existingUser = await this.userRepository.findByUsername(username);
      if (existingUser) {
        throw new ConflictException('Username is already taken');
      }
    }

    if (email && email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email is already registered');
      }
    }

    await this.userRepository.update(command.id, command.userDto);
  }
}
