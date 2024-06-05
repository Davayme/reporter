// src/admin/application/services/get-all-users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserResponseDto } from '../dtos/user-response.dto';

@Injectable()
export class GetAllUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany({
      include: {
        usuarios_roles: {
          include: {
            rol: true,
          },
        },
      },
    });
    return users.map(user => ({
      id: user.id_user,
      username: user.username,
      email: user.email,
      role: user.usuarios_roles.map(ur => ur.rol.rol),
      statusActive: user.statusActive,
    }));
  }
}
