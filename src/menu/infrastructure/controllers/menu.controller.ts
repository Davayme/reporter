import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt.guard';
import { RolesGuard } from '../../../auth/infrastructure/guards/roles.guard';
import { CheckPermissionsService } from '../../application/services/check-permissions.service';
import { Request } from 'express';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('menu')
@Controller('menu')

@UseGuards(JwtAuthGuard, RolesGuard)
export class MenuController {
  constructor(private readonly checkPermissionsService: CheckPermissionsService) {}

  @Get(':id')
  async getMenu(@Param('id') id_menu: number, @Req() request: Request & { user: User }) {
    const user = request.user;
    const hasReadPermission = await this.checkPermissionsService.hasPermission(user.id_user, id_menu, 'leer');

    if (!hasReadPermission) {
      throw new HttpException('Forbidden NOT ACCESS TO THIS ROUTE', HttpStatus.FORBIDDEN);
    }

    // Lógica para obtener el menú
    return { message: 'Menu details' };
  }

  @Post(':id')
  async createMenu(@Param('id') id_menu: number, @Req() request: Request & { user: User }) {
    const user = request.user;
    const hasCreatePermission = await this.checkPermissionsService.hasPermission(user.id_user, id_menu, 'nuevo');

    if (!hasCreatePermission) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    // Lógica para crear el menú
    return { message: 'Menu created' };
  }

  @Put(':id')
  async updateMenu(@Param('id') id_menu: number, @Req() request: Request & { user: User }) {
    const user = request.user;
    const hasEditPermission = await this.checkPermissionsService.hasPermission(user.id_user, id_menu, 'editar');

    if (!hasEditPermission) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    // Lógica para actualizar el menú
    return { message: 'Menu updated' };
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id_menu: number, @Req() request: Request & { user: User }) {
    const user = request.user;
    const hasDeletePermission = await this.checkPermissionsService.hasPermission(user.id_user, id_menu, 'eliminar');

    if (!hasDeletePermission) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    // Lógica para eliminar el menú
    return { message: 'Menu deleted' };
  }
}
