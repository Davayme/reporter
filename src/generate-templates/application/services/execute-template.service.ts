import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { GenerateTemplateRepository } from 'src/generate-templates/domian/repositories/execute-template.repository';
import { KnexService } from 'src/generate-templates/infraestructure/knex-service/knex.service';

@Injectable()
export class ExecuteTemplateService {
  constructor(
    private readonly knexService: KnexService,
    @Inject('GenerateTemplateRepository') private templateRepository: GenerateTemplateRepository,
  ) { }

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
      const processedResults = this.processFinancialTemplate(results, template.templateDetails);
      filteredResults = {
        data: processedResults.filteredResults,
        totals: processedResults.totals
      };
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

  private processFinancialTemplate(results: any[], details: any[]): { filteredResults: any[], totals: any } {
    const filteredResults = results.map(result => {
      const filteredResult = {};
      details.forEach(detail => {
        if (result.hasOwnProperty(detail.field)) {
          filteredResult[detail.field] = result[detail.field];
        }
      });
      return filteredResult;
    });

    const totals = {};
    details.forEach(detail => {
      if (detail.operation === 'sum') {
        if (!totals[detail.field]) {
          totals[detail.field] = 0;
        }
        totals[detail.field] += filteredResults.reduce((acc, row) => acc + (row[detail.field] || 0), 0);
      } else if (detail.operation === 'avg') {
        if (!totals[detail.field]) {
          totals[detail.field] = 0;
        }
        const sum = filteredResults.reduce((acc, row) => acc + (row[detail.field] || 0), 0);
        totals[detail.field] = sum / filteredResults.length;
      }
    });

    return {
      filteredResults,
      totals
    };
  }
}
