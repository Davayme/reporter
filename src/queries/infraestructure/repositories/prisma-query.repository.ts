import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient, Query } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { QueryRepository } from 'src/queries/domain/repositories/query.repository';

@Injectable()
export class PrismaQueryRepository implements QueryRepository {


  private prisma = new PrismaClient();

  async findAll(): Promise<Query[]> {
    return this.prisma.query.findMany(
      { where: { statusActive: true } }
    );
  }

  async findAllByServerId(serverId: number): Promise<Query[]> {
    return this.prisma.query.findMany({
      where: { id_server: serverId, statusActive: true }
    });
  }

  async create(query: Omit<Query, 'id_querie'>): Promise<Query> {
    try {
      const serverExists = await this.prisma.server.findUnique({
        where: { id: query.id_server },
      });

      if (!serverExists) {
        throw new NotFoundException(`Server with id ${query.id_server} not found`);
      }

      return await this.prisma.query.create({
        data: query
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Manejar errores específicos de Prisma, como violaciones de restricciones únicas
        if (error.code === 'P2002') {
          throw new BadRequestException('A query with the specified details already exists.');
        }
        throw new BadRequestException(error.message);
      } else if (error instanceof PrismaClientValidationError) {
        // Manejar errores de validación de Prisma
        throw new BadRequestException('Validation error in Prisma operation.');
      } else {
        // Manejar cualquier otro tipo de error
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }

  async update(id: number, query: Partial<Query>): Promise<Query> {
    try {
      const existingQuery = await this.prisma.query.findUnique({ where: { id_querie: id } });

      if (!existingQuery) {
        throw new NotFoundException('Query not found');
      }

      return await this.prisma.query.update({
        where: { id_querie: id },
        data: query
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Manejar errores específicos de Prisma, como violaciones de restricciones únicas
        if (error.code === 'P2002') {
          throw new BadRequestException('The update operation violates a unique constraint.');
        }
        throw new BadRequestException(error.message);
      } else if (error instanceof PrismaClientValidationError) {
        // Manejar errores de validación de Prisma
        throw new BadRequestException('Validation error in Prisma operation.');
      } else {
        // Manejar cualquier otro tipo de error
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }

  async delete(id: number): Promise<Query> {
    try {
      const existingQuery = await this.prisma.query.findUnique({ where: { id_querie: id } });

      if (!existingQuery) {
        throw new NotFoundException('Query not found');
      }

      return await this.prisma.query.update({
        where: { id_querie: id },
        data: { statusActive: false }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Manejar errores específicos de Prisma
        throw new BadRequestException(error.message);
      } else if (error instanceof PrismaClientValidationError) {
        // Manejar errores de validación de Prisma
        throw new BadRequestException('Validation error in Prisma operation.');
      } else {
        // Manejar cualquier otro tipo de error
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }
}
