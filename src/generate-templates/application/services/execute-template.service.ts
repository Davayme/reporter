import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { GenerateTemplateRepository } from 'src/generate-templates/domian/repositories/execute-template.repository';
import { KnexService } from 'src/generate-templates/infraestructure/knex-service/knex.service';

@Injectable()
export class ExecuteTemplateService {
  constructor(
    private readonly knexService: KnexService,
    @Inject('GenerateTemplateRepository') private templateRepository: GenerateTemplateRepository,
  ) {}

  async executeTemplate(id_template: number, type: string): Promise<any> {
   
    const template = await this.templateRepository.findTemplateById(id_template);
    if (!template) {
      throw new NotFoundException(`Template with ID ${id_template} not found`);
    }

    // Conéctate al servidor de la base de datos
    await this.knexService.connect(template.query.Server);

    // Ejecuta la consulta
    const results = await this.knexService.executeQuery(template.query.sentence);

    // Filtra los resultados según los campos del template
    let filteredResults;
    if (type === 'financial') {
      
      filteredResults = this.processFinancialTemplate(results, template.templateDetails);
    } else {
      // Procesamiento general
      filteredResults = results.map(result => {
        const filteredResult = {};
        template.templateDetails.forEach(detail => {
          if (result.hasOwnProperty(detail.field)) {
            filteredResult[detail.field] = result[detail.field];
          }
        });
        return filteredResult;
      });
    }

    return filteredResults;
  }

  private processFinancialTemplate(results: any[], details: any[]): any[] {
    // Lógica específica para templates financieros
    return results.map(result => {
      const filteredResult = {};
      let total = 0;
      details.forEach(detail => {
        if (result.hasOwnProperty(detail.field)) {
          filteredResult[detail.field] = result[detail.field];
          if (detail.field === 'amount') {
            total += result[detail.field];
          }
        }
      });
      filteredResult['total'] = total;
      return filteredResult;
    });
  }
}