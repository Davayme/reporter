import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UpdateUserService } from './application/services/update-user.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaUserRepository,
    {
      provide: 'UserRepository',
      useExisting: PrismaUserRepository,
    },
    UpdateUserService
  ],
  exports: [UpdateUserService],
})
export class UserModule {}
