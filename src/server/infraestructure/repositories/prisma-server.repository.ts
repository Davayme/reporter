
// src/server/infrastructure/repositories/prisma-server.repository.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaClient, Server } from '@prisma/client';
import { ServerRepository } from '../../domain/repositories/server.repository';

@Injectable()
export class PrismaServerRepository implements ServerRepository {
  private prisma = new PrismaClient();
  async findAll(): Promise<Server[]> {
    return this.prisma.server.findMany({
      where: {
        statusActive: true
      },
      orderBy: {
        name: 'asc',
      },
    });
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

  async update(id: number, server: Partial<Server>): Promise<Server> {
    try {
      return await this.prisma.server.update({
        where: { id },
        data: server,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Server not found');
      }
      throw error;
    }
  }

  async delete(id: number): Promise<Server> {
    try {
      return await this.prisma.server.update({
        where: { id },
        data: { statusActive: false },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Server not found');
      }
      throw error;
    }
  }

}
