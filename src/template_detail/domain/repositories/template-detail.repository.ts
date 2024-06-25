import { Template_Detail } from '@prisma/client';
import { UpdateTemplateDetailDto } from 'src/template_detail/applicaction/dtos/update-template-detail.dto';

export interface TemplateDetailRepository {

  createMany(details: Omit<Template_Detail, 'id_detail'>[]): Promise<Template_Detail[]>;
  updateMany(details: (UpdateTemplateDetailDto & { id_detail: number })[]): Promise<Template_Detail[]>;
  updateStatusToInactive(id_details: number[]): Promise<void>;
}