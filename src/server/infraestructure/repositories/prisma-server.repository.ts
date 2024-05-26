
// src/server/infrastructure/repositories/prisma-server.repository.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClient, Server } from '@prisma/client';
import { ServerRepository } from '../../domain/repositories/server.repository';

@Injectable()
export class PrismaServerRepository implements ServerRepository {
  private prisma = new PrismaClient();
  async findAll(): Promise<Server[]> {  // Implementar método
    return this.prisma.server.findMany();
  }

  async create(server: Omit<Server, 'id'>): Promise<Server> {
    try {
      return await this.prisma.server.create({
        data: server,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Server already exists');
      }
      throw error;
    }
  }

}
