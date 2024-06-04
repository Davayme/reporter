import { Inject, Injectable } from "@nestjs/common";
import { DeleteQueryCommand } from "../commands/query.comands";
import { Query } from "@prisma/client";
import { QueryRepository } from "src/queries/domain/repositories/query.repository";

@Injectable()
export class DeleteQueryService {
  constructor(
    @Inject('QueryRepository') private readonly queryRepository: QueryRepository
  ) {}

  async execute(command: DeleteQueryCommand): Promise<Query> {
    const { id } = command;
    return this.queryRepository.delete(id);
  }
}