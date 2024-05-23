import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class GetPermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPermissionsByRole(roleId: number) {
    return this.prisma.permission.findMany({
      where: {
        Menu: {
          id_role: roleId,
        },
      },
      include: {
        Menu: true,
      },
    });
  }
}
