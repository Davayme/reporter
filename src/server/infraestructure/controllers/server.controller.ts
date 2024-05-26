// src/server/infrastructure/controllers/server.controller.ts
import { Controller, Post, Body, UseGuards, ValidationPipe, Get } from '@nestjs/common';
import { CreateServerService } from '../../application/services/create-server.service';
import { CreateServerCommand } from 'src/server/application/commands/server.command';
import { CreateServerDto } from 'src/server/application/dto/create-server.dto';
import { Server } from '@prisma/client';
import { GetAllServersService } from 'src/server/application/services/get-all-servers.service';

@Controller('servers')
export class ServerController {
  constructor(
    private readonly createServerService: CreateServerService,
    private readonly getAllServersService: GetAllServersService
  ) {}

  @Get() 
  async findAll(): Promise<Server[]> {
    return this.getAllServersService.execute();
  }

  @Post()
  async create(@Body(new ValidationPipe()) createServerDto: CreateServerDto): Promise<Server> {
    const command = new CreateServerCommand(createServerDto);
    return this.createServerService.execute(command);
  }
}
