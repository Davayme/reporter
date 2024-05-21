// src/user/user.module.ts
import { Module } from '@nestjs/common';


import { UserController } from './infraestructure/controllers/user.controller';

import { CreateUserService } from './application/services/create-user.service';
import { PrismaUserRepository } from './infraestructure/repositories/prisma-user.repository';

@Module({
    controllers: [UserController],
    providers: [
      PrismaUserRepository,
      {
        provide: 'UserRepository',
        useExisting: PrismaUserRepository,
      },
      CreateUserService,
    ],
    exports: [CreateUserService],
  })
  export class UserModule {}
