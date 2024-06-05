import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RemoveMenuDto } from '../dtos/remove-menu.dto';

@Injectable()
export class RemoveMenuService {
  constructor(private readonly prisma: PrismaService) {}

  async removeMenu(removeMenuDto: RemoveMenuDto): Promise<void> {
    const { userId, menuName } = removeMenuDto;

    const user = await this.prisma.user.findUnique({ where: { id_user: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const menu = await this.prisma.menu.findFirst({ where: { nombre: menuName } });
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    const permissions = await this.prisma.permisosMenus.findMany({
      where: {
        id_menu: menu.id_menu,
      },
    });

    if (permissions.length === 0) {
      throw new NotFoundException('No permissions found for this menu');
    }

    // Ensure there's at least one read permission
    const readPermission = permissions.find(p => p.id_permiso === 1);
    if (!readPermission) {
      throw new BadRequestException('Cannot remove menu without read permission');
    }

    await this.prisma.permisosMenus.deleteMany({
      where: {
        id_menu: menu.id_menu,
        id_permiso: {
          not: 1, // Do not delete read permission
        },
      },
    });
  }
}
