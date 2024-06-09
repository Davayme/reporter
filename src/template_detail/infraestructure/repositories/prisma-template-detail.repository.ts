import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaClient, Template_Detail } from "@prisma/client";
import { UpdateTemplateDetailDto } from "src/template_detail/applicaction/dtos/update-template-detail.dto";
import { TemplateDetailRepository } from "src/template_detail/domain/repositories/template-detail.repository";

@Injectable()
export class PrismaTemplateDetailRepository implements TemplateDetailRepository {
    private prisma = new PrismaClient();

    async createMany(details: Omit<Template_Detail, 'id_detail'>[]): Promise<Template_Detail[]> {
        try {
            const createdDetails = await Promise.all(
                details.map(detail => this.prisma.template_Detail.create({ data: detail }))
            );
            return createdDetails;
        } catch (error) {
            throw new Error(`Error creating template details: ${error.message}`);
        }
    }

    async updateMany(details: (UpdateTemplateDetailDto & { id_detail: number })[]): Promise<Template_Detail[]> {
        try {
            const updatePromises = details.map(detail =>
                this.prisma.template_Detail.update({
                    where: { id_detail: detail.id_detail },
                    data: {
                        field: detail.field,
                        typeField: detail.typeField,
                        statusActive: detail.statusActive,
                        operation: detail.operation,
                    },
                })
            );

            return await Promise.all(updatePromises);
        } catch (error) {
            throw new Error(`Error updating template details: ${error.message}`);
        }
    }

    async updateStatusToInactive(id_details: number[]): Promise<void> {
        try {
            await this.prisma.template_Detail.updateMany({
                where: {
                    id_detail: { in: id_details },
                },
                data: {
                    statusActive: false,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to update status');
        }
    }
}