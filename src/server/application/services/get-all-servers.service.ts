// src/server/application/services/get-all-servers.service.ts
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ServerRepository } from '../../domain/repositories/server.repository';
import { Server } from '@prisma/client';

@Injectable()
export class GetAllServersService {
  constructor(
    @Inject('ServerRepository') private readonly serverRepository: ServerRepository
  ) {}

  async execute(): Promise<Server[]> {
    return this.serverRepository.findAll();
  }
}
