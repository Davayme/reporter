import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GetPermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  /*
  async getMenusAndPermissionsByRoles(userId :number): Promise<any> {

    //Obejtener los roles del usuario
    const userRoles = await this.prisma.userRoles.findMany({
      where: { id_user: userId },
      include: { rol: true },
    });

    const roleIds = userRoles.map(userRole => userRole.id_rol);

    if (roleIds.length === 0) {
      return {menus: [], permissions: []};
    }


    // Obtener los menús accesibles por roles
    const menus = await this.prisma.menusRoles.findMany({
      where: {
        id_rol: { in: roleIds },
      },
      include: {
        menu: true,
      },
    });

    const menuIds = menus.map(menuRole => menuRole.id_menu);

    // Obtener los permisos de los menús
    const permissions = await this.prisma.permisosMenus.findMany({
      where: {
        id_menu: { in: menuIds },
      },
      include: {
        permiso: true,
      },
    });

    return {
      menus: menus.map(menuRole => menuRole.menu),
      permissions: permissions.map(permissionMenu => permissionMenu.permiso),
    };
  }
  */
  async getMenusAndPermissionsByUserId(userId: number): Promise<any> {
    // Obtener los roles del usuario
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

    // Extraer los menús y permisos
    const menusWithPermissions = userRoles.flatMap(userRole => {
      return userRole.rol.menus_roles.map(menuRole => {
        return {
          menu: menuRole.menu.nombre,
          permissions: menuRole.menu.permisos_menus.map(permisoMenu => permisoMenu.permiso.permiso),
        };
      });
    });

    return menusWithPermissions;
  }
}
