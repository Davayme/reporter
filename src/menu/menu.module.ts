import { Module } from '@nestjs/common';
import { MenuController } from './infrastructure/controllers/menu.controller';
import { GetPermissionsService } from './application/services/get-permissions.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MenuController],
  providers: [GetPermissionsService],
})
export class MenuModule {}
