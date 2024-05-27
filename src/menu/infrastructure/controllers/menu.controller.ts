import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt.guard';
import { RolesGuard } from '../../../auth/infrastructure/guards/roles.guard';
import { GetPermissionsService } from '../../application/services/get-permissions.service';
import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('menu')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenuController {
  constructor(private readonly getPermissionsService: GetPermissionsService) {}

  @Get()
  async getMenu(@Req() request: Request & { user: { id_user: number; username: string; password: string; email: string; statusActive: boolean; } }) {
    const user = request.user;
    const permissions = await this.getPermissionsService.getPermissionsByUserId(user.id_user);
    return permissions;
  }
}
