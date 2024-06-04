import { Inject, Injectable } from "@nestjs/common";
import { QueryRepository } from "src/queries/domain/repositories/query.repository";
import { UpdateQueryCommand } from "../commands/query.comands";
import { Query } from "@prisma/client";

@Injectable()
export class UpdateQueryService {
  constructor(
    @Inject('QueryRepository') private readonly queryRepository: QueryRepository
  ) {}

  async execute(command: UpdateQueryCommand): Promise<Query> {
    const { id, updateQueryDto } = command;
    return this.queryRepository.update(id, updateQueryDto);
  }
}