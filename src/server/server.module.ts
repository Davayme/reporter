import { Module } from '@nestjs/common';
import { ServerService } from './application/server.service';
import { ServerController } from './infraestructure/server.controller';

@Module({
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
