import { TemplateWithDetails } from "src/generate-templates/infraestructure/repositories/prisma-template.repository";

export interface GenerateTemplateRepository {
    findTemplateById(id: number): Promise<TemplateWithDetails | null>;
}
  