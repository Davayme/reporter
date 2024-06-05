// src/admin/application/services/assign-role.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AssignRoleDto } from '../dtos/assign-role.dto';

@Injectable()
export class AssignRoleService {
  constructor(private readonly prisma: PrismaService) {}

  async assignRoles(assignRoleDto: AssignRoleDto): Promise<any> {
    const { userId, roleIds } = assignRoleDto;

    // Verificar si el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id_user: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Obtener roles existentes para el usuario
    const existingRoles = await this.prisma.userRoles.findMany({
      where: { id_user: userId },
    });

    // Filtrar roles que ya están asignados
    const newRoleIds = roleIds.filter(roleId => 
      !existingRoles.some(existingRole => existingRole.id_rol === roleId)
    );

    if (newRoleIds.length === 0) {
      throw new ConflictException('User already has these roles assigned');
    }

    // Asignar nuevos roles
    await this.prisma.userRoles.createMany({
      data: newRoleIds.map(roleId => ({
        id_user: userId,
        id_rol: roleId,
      })),
    });

    return { message: 'Roles assigned successfully' };
  }
}
