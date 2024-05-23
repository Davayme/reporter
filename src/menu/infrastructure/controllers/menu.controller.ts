import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { GetPermissionsService } from '../../application/services/get-permissions.service';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt.guard';
import { Request } from 'express';
import { User } from '@prisma/client';

@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuController {
    constructor(private readonly getPermissionsService: GetPermissionsService) {}

    @Get()
    async getMenu(@Req() request: Request & { user: User }) {
        const user = request.user as User;
        const permissions = await this.getPermissionsService.getPermissionsByRole(user.roleId);
        return permissions;
    }
}
