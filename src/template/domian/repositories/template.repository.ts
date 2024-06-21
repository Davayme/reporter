import { Query, Server, Template, Template_Detail } from '@prisma/client';

export interface TemplateRepository {

  
  update(id_template: number, template: Omit<Template, 'id_template'>): Promise<Template>;

  findAll(): Promise<(Template & {
    query: Query & {
      Server: Server;
    };
    templateDetails: Template_Detail[];
  })[]>;

  findById(id_template: number): Promise<Template | null>;
  create(template: Omit<Template, 'id_template'>, details: Omit<Template_Detail, 'id_detail'>[]): Promise<Template>;
  delete(id_template: number): Promise<void>;
}
