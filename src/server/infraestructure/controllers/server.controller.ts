// src/server/infrastructure/controllers/server.controller.ts
import { Controller, Post, Body, UseGuards, ValidationPipe, Get, Patch, Param, Delete } from '@nestjs/common';
import { CreateServerService } from '../../application/services/create-server.service';
import { CreateServerCommand, DeleteServerCommand, UpdateServerCommand } from 'src/server/application/commands/server.command';
import { CreateServerDto } from 'src/server/application/dto/create-server.dto';
import { Server } from '@prisma/client';
import { GetAllServersService } from 'src/server/application/services/get-all-servers.service';
import { UpdateServerDto } from 'src/server/application/dto/update-server.dto';
import { UpdateServerService } from 'src/server/application/services/update-server.service';
import { DeleteServerService } from 'src/server/application/services/delete-server.service';

@Controller('servers')
export class ServerController {
  constructor(
    private readonly createServerService: CreateServerService,
    private readonly getAllServersService: GetAllServersService,
    private readonly updateServerService: UpdateServerService,
    private readonly deleteServerService: DeleteServerService
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
  @Patch(':id')
  async update(@Param('id') id: number, @Body(new ValidationPipe()) updateServerDto: UpdateServerDto): Promise<Server> {
    const command = new UpdateServerCommand(id, updateServerDto);
    return this.updateServerService.execute(command);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Server> {
    const command = new DeleteServerCommand(id);
    return this.deleteServerService.execute(command);
  }
}
