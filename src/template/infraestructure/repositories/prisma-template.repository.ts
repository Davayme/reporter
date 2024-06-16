import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient, Query, Server, Template, Template_Detail } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { TemplateRepository } from 'src/template/domian/repositories/template.repository';

@Injectable()
export class PrismaTemplateRepository implements TemplateRepository {
  private prisma = new PrismaClient();

  async findAll(): Promise<(Template & {
    query: Query & {
      Server: Server;
    };
    templateDetails: Template_Detail[];
  })[]> {
    return this.prisma.template.findMany({
      where: { statusActive: true },
      include: {
        query: {
          include: {
            Server: true,
          },
        },
        templateDetails: {
          where: { statusActive: true }, // Se agrega esta línea para filtrar por statusActive: true
        },
      },
    });
  }

  async findById(id_template: number): Promise<Template | null> {
    return await this.prisma.template.findUnique({
      where: { id_template },
      include: {
        query: {
          include: {
            Server: true,
          },
        },
        templateDetails: true,
      },
    });
  }

  async create(template: Omit<Template, 'id_template'>, details: Omit<Template_Detail, 'id_detail'>[]): Promise<Template> {
    try {
      return await this.prisma.template.create({
        data: {
          name: template.name,
          queryId: template.queryId,
          statusActive: template.statusActive,
          templateDetails: {
            create: details.map(detail => ({
              field: detail.field,
              typeField: detail.typeField,
              statusActive: detail.statusActive,
              operation: detail.operation, // Incluir el campo de operación
            })),
          },
        },
        include: {
          templateDetails: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Manejar errores específicos de Prisma, como violaciones de restricciones únicas
        if (error.code === 'P2002') {
          throw new BadRequestException('There is a unique constraint violation, a new template cannot be created with this title');
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

  async update(id_template: number, template: Omit<Template, 'id_template'>): Promise<Template> {
    try {
      return await this.prisma.template.update({
        where: { id_template },
        data: {
          name: template.name,
          queryId: template.queryId,
          statusActive: template.statusActive,
        },
        include: {
          templateDetails: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Template with ID ${id_template} not found.`);
        }
        throw new BadRequestException(error.message);
      } else if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException('Validation error in Prisma operation.');
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }

  async delete(id_template: number): Promise<void> {
    try {
      await this.prisma.template.update({
        where: { id_template },
        data: {
          statusActive: false,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Manejar errores específicos de Prisma, como intentar actualizar un registro que no existe
        if (error.code === 'P2025') {
          throw new NotFoundException(`Template with ID ${id_template} not found.`);
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
}