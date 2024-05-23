// src/admin/application/services/get-all-users.service.ts
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { AdminRepository } from '../../domain/repositories/admin.repository';
import { UserResponseDto } from '../dtos/user-response.dto';

@Injectable()
export class GetAllUsersService {
  constructor(
    @Inject('AdminRepository') private readonly adminRepository: AdminRepository
  ) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.adminRepository.findAll();
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.roleId,
      statusActive: user.statusActive
    }));
  }
}

