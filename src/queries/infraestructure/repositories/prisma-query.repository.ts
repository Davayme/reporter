import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Query } from '@prisma/client';
import { QueryRepository } from 'src/queries/domain/repositories/query.repository';

@Injectable()
export class PrismaQueryRepository implements QueryRepository {
  private prisma = new PrismaClient();

  async findAllByServerId(serverId: number): Promise<Query[]> {
    return this.prisma.query.findMany({
      where: { id_server: serverId, statusActive: true }
    });
  }

  async create(query: Omit<Query, 'id_querie'>): Promise<Query> {
    const serverExists = await this.prisma.server.findUnique({
      where: { id: query.id_server },
    });

    if (!serverExists) {
      throw new NotFoundException(`Server with id ${query.id_server} not found`);
    }

    return this.prisma.query.create({
      data: query
    });
  }

  async update(id: number, query: Partial<Query>): Promise<Query> {
    const existingQuery = await this.prisma.query.findUnique({ where: { id_querie: id } });

    if (!existingQuery) {
      throw new NotFoundException('Query not found');
    }

    return this.prisma.query.update({
      where: { id_querie: id },
      data: query
    });
  }
  
  async delete(id: number): Promise<Query> {
    const existingQuery = await this.prisma.query.findUnique({ where: { id_querie: id } });

    if (!existingQuery) {
      throw new NotFoundException('Query not found');
    }

    return this.prisma.query.update({
      where: { id_querie: id },
      data: { statusActive: false }
    });
  }
}
