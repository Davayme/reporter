import { Query, Server, Template, Template_Detail } from '@prisma/client';

export interface TemplateRepository {

  
  update(id_template: number, template: Omit<Template, 'id_template'>, details: Omit<Template_Detail, 'id_detail'>[]): Promise<Template>;

  findAll(): Promise<(Template & {
    query: Query & {
      Server: Server;
    };
    templateDetails: Template_Detail[];
  })[]>;

  create(template: Omit<Template, 'id_template'>, details: Omit<Template_Detail, 'id_detail'>[]): Promise<Template>;
  delete(id_template: number): Promise<void>;
}
