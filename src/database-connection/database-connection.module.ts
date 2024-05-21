import { Module } from '@nestjs/common';
import { DatabaseConnectionService } from './application/services/database-connection.service';
import { DatabaseConnectionController } from './infrastructure/controllers/database-connection.controller';
import { PrismaModule } from '../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DatabaseConnectionController],
  providers: [DatabaseConnectionService],
})
export class DatabaseConnectionModule {}
