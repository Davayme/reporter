// src/user/user.module.ts
import { Module } from '@nestjs/common';


import { UserController } from './infraestructure/controllers/admin.controller';

import { PrismaUserRepository } from './infraestructure/repositories/prisma-admin.repository';
import { UpdateUserService } from './application/services/update-user.service';

@Module({
    controllers: [UserController],
    providers: [
      PrismaUserRepository,
      {
        provide: 'UserRepository',
        useExisting: PrismaUserRepository,
      },
      UpdateUserService,
    ],
    exports: [UpdateUserService],
  })
  export class AdminModule {}
