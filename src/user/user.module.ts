
import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UpdateUserService } from './application/services/update-user.service';
import { UserController } from './infrastructure/controllers/user.controller';



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

}
)
export class UserModule {}
