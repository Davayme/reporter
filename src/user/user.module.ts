// src/user/user.module.ts
import { Module } from '@nestjs/common';


import { UserController } from './infraestructure/controllers/user.controller';

import { CreateUserService } from './application/services/create-user.service';
import { PrismaUserRepository } from './infraestructure/repositories/prisma-user.repository';
import { UpdateUserService } from './application/services/update-user.service';

@Module({
    controllers: [UserController],
    providers: [
      PrismaUserRepository,
      {
        provide: 'UserRepository',
        useExisting: PrismaUserRepository,
      },
      CreateUserService,
      UpdateUserService,
    ],
    exports: [CreateUserService, UpdateUserService],
  })
  export class UserModule {}
