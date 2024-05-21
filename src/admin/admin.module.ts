// src/user/user.module.ts
import { Module } from '@nestjs/common';


import { AdminController } from './infraestructure/controllers/admin.controller';

import { PrismaAdminRepository } from './infraestructure/repositories/prisma-admin.repository';
import { UpdateUserService } from './application/services/update-user.service';
import { GetAllUsersService } from './application/services/get-all-users.service';
import { DeleteUserService } from './application/services/delete-user.service';

@Module({
    controllers: [AdminController],
    providers: [
      PrismaAdminRepository,
      {
        provide: 'AdminRepository',
        useExisting: PrismaAdminRepository,
      },
      UpdateUserService,
      GetAllUsersService,
      DeleteUserService
    ],
    exports: [UpdateUserService, GetAllUsersService],
  })
  export class AdminModule {}
