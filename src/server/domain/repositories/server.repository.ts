// src/server/domain/repositories/server.repository.ts
import { Server } from '@prisma/client';

export interface ServerRepository {
  findAll(): Promise<Server[]>
  create(server: Omit<Server, 'id'>): Promise<Server>;
  
}
