// src/server/application/services/create-server.service.ts
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ServerRepository } from 'src/server/domain/repositories/server.repository';
import { CreateServerCommand } from '../commands/server.command';
import { Server } from '@prisma/client';

@Injectable()
export class CreateServerService {
  constructor(
    @Inject('ServerRepository') private readonly serverRepository: ServerRepository
  ) {}

  async execute(command: CreateServerCommand): Promise<Server> {
    const { name, user, password, type_bd, port, database, ssl, description } = command.serverDto;
    return this.serverRepository.create({
      name, user, password, type_bd, port, database, ssl, statusActive:true, description
    });
  }
}
