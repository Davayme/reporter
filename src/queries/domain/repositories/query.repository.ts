import { Query } from '@prisma/client';

export interface QueryRepository {
  findAllByServerId(serverId: number): Promise<Query[]>;
  create(query: Omit<Query, 'id_querie'>): Promise<Query>;
  update(id: number, query: Partial<Query>): Promise<Query>;
  delete(id: number): Promise<Query>;
}
