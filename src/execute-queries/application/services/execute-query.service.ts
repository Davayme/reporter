import { Injectable, Inject } from '@nestjs/common';
import { ExecuteQueryDto } from '../dtos/execute-query.dto';
import { ServerRepository } from 'src/execute-queries/domian/repositories/server.repository';
import { DatabaseService } from 'src/execute-queries/infraestructure/knex-service/database.service';

@Injectable()
export class ExecuteQueryService {
  constructor(
    @Inject('ServerRepository') private readonly serverRepository: ServerRepository,
    private readonly databaseService: DatabaseService
  ) {}

  async execute(executeQueryDto: ExecuteQueryDto): Promise<any> {
    const { query, serverId } = executeQueryDto;
    const server = await this.serverRepository.findById(serverId);

    const connectionConfig = {
      host: server.string_url,
      user: server.user,
      password: server.password,
      database: server.type_bd,
      port: server.port,
      ssl: { rejectUnauthorized: false }
    };

    await this.databaseService.connect(server.type_bd, connectionConfig);
    return this.databaseService.executeQuery(query);
  }
}
