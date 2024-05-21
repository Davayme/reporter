// src/admin/application/services/delete-user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { AdminRepository } from '../../domain/repositories/admin.repository';
import { DeleteUserCommand} from '../commands/admin.command';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject('AdminRepository') private readonly adminRepository: AdminRepository
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const user = await this.adminRepository.findById(command.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.adminRepository.update(command.id, { statusActive: false });
  }
}
