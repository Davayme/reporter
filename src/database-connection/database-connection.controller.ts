import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { DatabaseConnectionService } from './database-connection.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateDatabaseConnectionDto } from './dto/create-database-connection.dto';
import {  UpdateDatabaseConnectionDto } from './dto/update-database-connection.dto';
import { Role } from '../auth/enums/roles.enum';

@Controller('database-connections')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DatabaseConnectionController {
  constructor(private readonly databaseConnectionService: DatabaseConnectionService) {}

  @Post()
  @Roles(Role[Role.User], Role[Role.Admin])
  create(@Body() createDatabaseConnectionDto: CreateDatabaseConnectionDto) {
    return this.databaseConnectionService.create(createDatabaseConnectionDto);
  }

  @Get()
  @Roles(Role[Role.User], Role[Role.Admin])
  findAll() {
    return this.databaseConnectionService.findAll();
  }

  @Get(':id')
  @Roles(Role[Role.User], Role[Role.Admin])
  findOne(@Param('id') id: string) {
    return this.databaseConnectionService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role[Role.User], Role[Role.Admin])
  update(@Param('id') id: string, @Body() updateDatabaseConnectionDto: UpdateDatabaseConnectionDto) {
    return this.databaseConnectionService.update(+id, updateDatabaseConnectionDto);
  }

  @Delete(':id')
  @Roles(Role[Role.Admin])
  remove(@Param('id') id: string) {
    return this.databaseConnectionService.remove(+id);
  }
}