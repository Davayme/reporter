import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Server } from '@prisma/client';
import { ServerRepository } from '../../domian/repositories/server.repository';

@Injectable()
export class PrismaServerRepository implements ServerRepository {
  private prisma = new PrismaClient();

  async findById(id: number): Promise<Server> {
    const server = await this.prisma.server.findUnique({ where: { id } });
    if (!server) {
      throw new NotFoundException('Server not found');
    }
    return server;
  }
}
