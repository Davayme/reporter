import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AssignPermissionDto } from '../dtos/assign-permission.dto';

@Injectable()
export class AssignPermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async assignPermission(assignPermissionDto: AssignPermissionDto): Promise<void> {
    const { userId, menuName, permissionId } = assignPermissionDto;

    const user = await this.prisma.user.findUnique({ where: { id_user: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const menu = await this.prisma.menu.findFirst({ where: { nombre: menuName } });
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    const existingPermission = await this.prisma.permisosMenus.findFirst({
      where: {
        id_menu: menu.id_menu,
        id_permiso: permissionId,
      },
    });

    if (!existingPermission) {
      await this.prisma.permisosMenus.create({
        data: {
          id_menu: menu.id_menu,
          id_permiso: permissionId,
        },
      });
    }
  }
}
