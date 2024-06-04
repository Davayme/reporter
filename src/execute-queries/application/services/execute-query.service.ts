import { Injectable, Inject } from '@nestjs/common';
import { ServerRepository } from 'src/execute-queries/domian/repositories/server.repository';
import { DatabaseService } from 'src/execute-queries/infraestructure/knex-service/database.service';
import { ExecuteQueryDto } from '../dtos/execute-query.dto';

@Injectable()
export class ExecuteQueryService {
  constructor(
    @Inject('ServerRepository') private readonly serverRepository: ServerRepository,
    private readonly databaseService: DatabaseService
  ) {}

  async execute(executeQueryDto: ExecuteQueryDto): Promise<any> {
    const { query, serverId } = executeQueryDto;
    const server = await this.serverRepository.findById(serverId);
    await this.databaseService.connect(server);
    return this.databaseService.executeQuery(query);
  }

}
