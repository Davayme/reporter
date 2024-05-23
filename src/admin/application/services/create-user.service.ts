// src/user/application/services/create-user.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/admin/domain/repositories/admin.repository';
import { CreateUserCommand } from '../commands/admin.command';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CreateUserService {
  constructor(
    @Inject('AdminRepository') private readonly adminRepository: AdminRepository
  ) { }

  async execute(command: CreateUserCommand): Promise<User> {
    const { username, password, email } = command.userDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.adminRepository.create({
      username,
      password: hashedPassword,
      email,
      roleId: 2,
      statusActive: true
    });
    return newUser;
  }
}