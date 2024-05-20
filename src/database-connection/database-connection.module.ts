import { Module } from '@nestjs/common';
import { DatabaseConnectionService } from './database-connection.service';
import { DatabaseConnectionController } from './database-connection.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DatabaseConnectionController],
  providers: [DatabaseConnectionService],
})
export class DatabaseConnectionModule {}
