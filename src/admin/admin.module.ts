import { Module } from '@nestjs/common';
import { AdminController } from './infraestructure/controllers/admin.controller';
import { PrismaAdminRepository } from './infraestructure/repositories/prisma-admin.repository';
import { CreateUserService } from './application/services/create-user.service';
import { UpdateUserService } from './application/services/update-user.service';
import { GetAllUsersService } from './application/services/get-all-users.service';
import { DeleteUserService } from './application/services/delete-user.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports : [PrismaModule],
  controllers: [AdminController],
  providers: [
    PrismaAdminRepository,
    {
      provide: 'AdminRepository',
      useExisting: PrismaAdminRepository,
    },
    CreateUserService,
    UpdateUserService,
    GetAllUsersService,
    DeleteUserService
  ],
  exports: [CreateUserService, UpdateUserService, GetAllUsersService],
})
export class AdminModule {}
