
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserCommand } from '../commands/create-user.command';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = new User(
      Date.now(),  // Generar un ID único
      command.username,
      command.password,
      command.email,
      command.roleId
    );
    await this.userRepository.create(user);
  }
}