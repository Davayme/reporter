import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { PrismaModule } from '../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
