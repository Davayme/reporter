import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GetPermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPermissionsByUserId(userId: number) {
    const userRoles = await this.prisma.userRoles.findMany({
      where: { id_user: userId },
      include: {
        rol: {
          include: {
            menus_roles: {
              include: {
                menu: {
                  include: {
                    permisos_menus: {
                      include: {
                        permiso: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const permissions = userRoles.flatMap(userRole =>
      userRole.rol.menus_roles.flatMap(menuRole =>
        menuRole.menu.permisos_menus.map(permissionMenu => permissionMenu.permiso)
      )
    );

    return permissions;
  }
}
