import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ServerRepository } from '../../domain/repositories/server.repository';
import { DeleteServerCommand } from '../commands/server.command';
import { Server } from '@prisma/client';

@Injectable()
export class DeleteServerService {
    constructor(
      @Inject('ServerRepository') private readonly serverRepository: ServerRepository
    ) {}
  
    async execute(command: DeleteServerCommand): Promise<Server> {
      return this.serverRepository.delete(command.id);
    }
  }