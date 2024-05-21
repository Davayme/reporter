// src/user/application/services/update-user.service.ts
import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { AdminRepository } from '../../domain/repositories/admin.repository';
import { UpdateUserCommand } from '../commands/admin.command';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('AdminRepository') private readonly adminRepository: AdminRepository
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.adminRepository.findById(command.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { username, email } = command.userDto;
    if (username && username !== user.username) {
      const existingUser = await this.adminRepository.findByUsername(username);
      if (existingUser) {
        throw new ConflictException('Username is already taken');
      }
    }

    if (email && email !== user.email) {
      const existingUser = await this.adminRepository.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('Email is already registered');
      }
    }

    await this.adminRepository.update(command.id, command.userDto);
  }
}
