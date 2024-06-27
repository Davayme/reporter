// src/server/infrastructure/controllers/server.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateServerService } from '../../application/services/create-server.service';
import {
  CreateServerCommand,
  DeleteServerCommand,
  UpdateServerCommand,
} from 'src/server/application/commands/server.command';
import { CreateServerDto } from 'src/server/application/dto/create-server.dto';
import { Server } from '@prisma/client';
import { GetAllServersService } from 'src/server/application/services/get-all-servers.service';
import { UpdateServerDto } from 'src/server/application/dto/update-server.dto';
import { UpdateServerService } from 'src/server/application/services/update-server.service';
import { DeleteServerService } from 'src/server/application/services/delete-server.service';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt.guard';
import { RolesGuard } from 'src/auth/infrastructure/guards/roles.guard';
import { PermissionsGuard } from 'src/auth/infrastructure/guards/permissions.guard';
import { Permissions } from 'src/auth/infrastructure/decorators/permissions.decorator';
import { Roles } from 'src/auth/infrastructure/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('servers')
@Controller('servers')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@Roles('admin')
@ApiBearerAuth()
export class ServerController {
  constructor(
    private readonly createServerService: CreateServerService,
    private readonly getAllServersService: GetAllServersService,
    private readonly updateServerService: UpdateServerService,
    private readonly deleteServerService: DeleteServerService,
  ) { }

  @Permissions('read')
  @ApiOperation({ summary: 'Obtener todos los servidores existentes' })
  @ApiResponse({ status: 200, description: 'Retornar el json con los datos de los servidores' })
  @Get()
  @Roles('admin', 'user')
  async findAll(): Promise<Server[]> {
    return this.getAllServersService.execute();
  }
  
  @ApiOperation({ summary: 'Crear un nuevo servidor' })
  @ApiResponse({ status: 201, description: 'Retornar el json del servidor creado' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Permissions('create')
  @Post()
  async create(
    @Body(new ValidationPipe()) createServerDto: CreateServerDto,
  ): Promise<Server> {
    const command = new CreateServerCommand(createServerDto);
    return this.createServerService.execute(command);
  }

  @ApiOperation({ summary: 'Actualizar un servidor' })
  @ApiResponse({ status: 200, description: 'Servidor actualizado correctamente' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'El ID del servidor que se va a actualizar. Debe ser un número entero positivo.', type: Number, required: true })
  @Permissions('update')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateServerDto: UpdateServerDto,
  ): Promise<Server> {
    const command = new UpdateServerCommand(id, updateServerDto);
    return this.updateServerService.execute(command);
  }

  @ApiOperation({ summary: 'Eliminar un servidor' })
  @ApiResponse({ status: 200, description: 'Servidor eliminado correctamente' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'El ID del servidor que se va a eliminar. Debe ser un número entero positivo.', type: Number, required: true })
  @Permissions('delete')
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Server> {
    const command = new DeleteServerCommand(id);
    return this.deleteServerService.execute(command);
  }
}
