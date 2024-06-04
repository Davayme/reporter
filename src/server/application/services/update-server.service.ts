import { Inject, Injectable } from '@nestjs/common';
import { Server } from '@prisma/client';
import { UpdateServerCommand } from '../commands/server.command';
import { ServerRepository } from '../../domain/repositories/server.repository';

@Injectable()
export class UpdateServerService {
  constructor(
    @Inject('ServerRepository') private readonly serverRepository: ServerRepository
  ) { }

  async execute(command: UpdateServerCommand): Promise<Server> {
    const { id, serverDto } = command;
    return this.serverRepository.update(id, serverDto);
  }
}