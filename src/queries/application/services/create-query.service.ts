import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { QueryRepository } from '../../domain/repositories/query.repository';
import { CreateQueryCommand } from '../commands/query.comands';
import { Query } from '@prisma/client';

@Injectable()
export class CreateQueryService {
  constructor(
    @Inject('QueryRepository') private readonly queryRepository: QueryRepository
  ) {}

  async execute(command: CreateQueryCommand): Promise<Query> {
    const {sentence, id_server} = command.createQueryDto;
    return this.queryRepository.create({sentence, id_server, statusActive: true});
  }
}
