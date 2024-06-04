import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CheckPermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async hasPermission(userId: number, menuId: number, permission: string): Promise<boolean> {
    const userRoles = await this.prisma.userRoles.findMany({
      where: { id_user: userId },
      include: { rol: true },
    });

    const roles = userRoles.map((ur) => ur.rol.id_rol);

    const permissions = await this.prisma.permisosMenus.findMany({
        where: {
            id_menu: menuId,
            permiso : {
                permiso: permission,
            },
            menu: {
                menus_roles: {
                    some: {
                        id_rol: { in: roles },
                    },
                },
            },
        },
    });

    return permissions.length > 0;
  }
}
