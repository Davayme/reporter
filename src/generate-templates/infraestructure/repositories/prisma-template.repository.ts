import { Injectable } from "@nestjs/common";
import { PrismaClient, Server, Template, Template_Detail, Query } from "@prisma/client";
import { GenerateTemplateRepository } from "src/generate-templates/domian/repositories/execute-template.repository";

export interface TemplateWithDetails extends Template {
  templateDetails: Template_Detail[]; // Ahora es un arreglo de Template_Detail
  query: Query & { // Incluir el tipo Query y anidar Server dentro de él
    Server: Server;
  };
}

@Injectable()
export class PrismaTemplateRepository implements GenerateTemplateRepository{
  private prisma = new PrismaClient();

  async findTemplateById(id: number): Promise<TemplateWithDetails | null> {
    return this.prisma.template.findUnique({
      where: { id_template: id },
      include: {
        templateDetails: true, // Incluir detalles del template
        query: {
          include: {
            Server: true, // Incluir el servidor relacionado
          },
        },
      },
    });
  }
}