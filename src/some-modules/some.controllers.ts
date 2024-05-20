import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('some-route')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SomeController {
@Get('public')
  getPublicData() {
    return 'This is public data';
  }

  @Get('admin')
  @Roles('admin')
  getAdminData() {
    return 'This is admin data';
  }

  @Get('user')
  @Roles('user')
  getUserData() {
    return 'This is user data';
  }
}
