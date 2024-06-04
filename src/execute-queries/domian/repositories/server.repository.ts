import { Server } from '@prisma/client';

export interface ServerRepository {
  findById(id: number): Promise<Server>;
}
