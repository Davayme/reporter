// src/server/server.module.ts
import { Module } from '@nestjs/common';
import { ServerController } from './infraestructure/controllers/server.controller';
import { PrismaServerRepository } from './infraestructure/repositories/prisma-server.repository';
import { CreateServerService } from './application/services/create-server.service';
import { GetAllServersService } from './application/services/get-all-servers.service';
import { UpdateServerService } from './application/services/update-server.service';
import { DeleteServerService } from './application/services/delete-server.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    PrismaModule, AuthModule
  ],
  controllers: [ServerController],
  providers: [
    PrismaServerRepository,
    {
      provide: 'ServerRepository',
      useClass: PrismaServerRepository,
    },
    CreateServerService,
    GetAllServersService,
    UpdateServerService,
    DeleteServerService,

  ],
  exports: [CreateServerService, GetAllServersService, UpdateServerService, DeleteServerService],
})
export class ServerModule {}

