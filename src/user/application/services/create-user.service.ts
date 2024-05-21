// src/user/application/services/create-user.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserCommand } from '../commands/user.command';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { username, password, email, roleId } = command.userDto;
    await this.userRepository.create({ username, password, email, roleId });
  }
}
