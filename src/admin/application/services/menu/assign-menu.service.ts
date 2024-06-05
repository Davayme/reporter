import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AssignMenuDto } from '../../dtos/assign-menu.dto';

@Injectable()
export class AssignMenuService {
  constructor(private readonly prisma: PrismaService) {}

  async assignMenu(assignMenuDto: AssignMenuDto): Promise<void> {
    const { userId, menuName, permissionId } = assignMenuDto;

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
      // Ensure the user has at least a read permission
      const readPermission = await this.prisma.permisosMenus.findFirst({
        where: {
          id_menu: menu.id_menu,
          id_permiso: 1, // Assuming 1 is the id for read permission
        },
      });

      if (!readPermission) {
        await this.prisma.permisosMenus.create({
          data: {
            id_menu: menu.id_menu,
            id_permiso: 1,
          },
        });
      }

      await this.prisma.permisosMenus.create({
        data: {
          id_menu: menu.id_menu,
          id_permiso: permissionId,
        },
      });
    }
  }
}
