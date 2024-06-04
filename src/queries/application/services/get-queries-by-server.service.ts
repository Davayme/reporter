import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { QueryRepository } from 'src/queries/domain/repositories/query.repository';


@Injectable()
export class GetQueriesByServerIdService {
  constructor(
    @Inject('QueryRepository') private readonly queryRepository: QueryRepository
  ) {}

  async execute(serverId: number): Promise<{ id: any; sentence: string; id_server: number; statusActive: boolean; }[]> {
    const queries = await this.queryRepository.findAllByServerId(serverId);
    return queries.map(query => ({
      id: query.id_querie,
      sentence: query.sentence,
      id_server: query.id_server,
      statusActive: query.statusActive
    }));
  }
}
