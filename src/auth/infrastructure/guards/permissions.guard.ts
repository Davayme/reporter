// src/auth/infrastructure/guards/permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const handler = context.getHandler();

    const requiredPermissions = this.reflector.get<string[]>('permissions', handler);
    if (!requiredPermissions) {
      return true;
    }

    const userRoles = await this.prisma.userRoles.findMany({
      where: {
        id_user: user.id_user,
      },
      include: {
        rol: true,
      },
    });

    const roleIds = userRoles.map(ur => ur.id_rol);
    const userPermissions = await this.prisma.permisosMenus.findMany({
      where: {
        menu: {
          menus_roles: {
            some: {
              id_rol: { in: roleIds },
            },
          },
        },
      },
      include: {
        permiso: true,
      },
    });

    const userPermissionNames = userPermissions.map(up => up.permiso.permiso);

    const hasPermission = requiredPermissions.every(permission =>
      userPermissionNames.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
