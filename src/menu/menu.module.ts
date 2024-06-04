import { Module } from '@nestjs/common';
import { MenuController } from './infrastructure/controllers/menu.controller';
import { GetPermissionsService } from './application/services/get-permissions.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CheckPermissionsService } from './application/services/check-permissions.service';

@Module({
  imports: [PrismaModule],
  controllers: [MenuController],
  providers: [GetPermissionsService, CheckPermissionsService],
  exports: [GetPermissionsService, CheckPermissionsService],
})
export class MenuModule {}
