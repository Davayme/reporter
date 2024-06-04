import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { QueryRepository } from 'src/queries/domain/repositories/query.repository';


@Injectable()
export class GetQueries {
    constructor(
        @Inject('QueryRepository') private readonly queryRepository: QueryRepository
    ) { }

    async execute(): Promise<{ id_querie: number; sentence: string; id_server: number; statusActive: boolean; }[]> {
        const queries = await this.queryRepository.findAll();
        return queries.map(query => ({
            id_querie: query.id_querie,
            sentence: query.sentence,
            id_server: query.id_server,
            statusActive: query.statusActive
        }));
    }
}
