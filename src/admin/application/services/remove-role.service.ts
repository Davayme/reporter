// src/admin/application/services/remove-role.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RemoveRoleDto } from '../dtos/remove-role.dto';

@Injectable()
export class RemoveRoleService {
  constructor(private readonly prisma: PrismaService) {}

  async removeRoles(removeRoleDto: RemoveRoleDto): Promise<any> {
    const { userId, roleIds } = removeRoleDto;

    // Verificar si el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id_user: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Eliminar roles
    await this.prisma.userRoles.deleteMany({
      where: {
        id_user: userId,
        id_rol: {
          in: roleIds,
        },
      },
    });

    return { message: 'Roles removed successfully' };
  }
}
