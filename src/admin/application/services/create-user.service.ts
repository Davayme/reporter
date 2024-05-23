// src/user/application/services/create-user.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/admin/domain/repositories/admin.repository';
import { CreateUserCommand} from '../commands/admin.command';
import { User } from '@prisma/client';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('AdminRepository') private readonly adminRepository: AdminRepository
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { username, password, email } = command.userDto;
    const newUser =await this.adminRepository.create({ username, password, email, roleId:2, statusActive: true });
    return newUser;
  }
}