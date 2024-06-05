import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RemovePermissionDto } from '../dtos/remove-permission.dto';

@Injectable()
export class RemovePermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async removePermission(removePermissionDto: RemovePermissionDto): Promise<void> {
    const { userId, menuName, permissionId } = removePermissionDto;

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
      throw new NotFoundException('Permission not found for this menu');
    }

    await this.prisma.permisosMenus.deleteMany({
      where: {
        id_menu: menu.id_menu,
        id_permiso: permissionId,
      },
    });
  }
}
