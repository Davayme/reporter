import { Injectable } from '@nestjs/common';
import { Server } from '@prisma/client';
import { DatabaseInterface } from './IDatabase';
import { DatabaseFactory } from './DatabaseFactory';
@Injectable()
export class KnexService {
  private db: DatabaseInterface;

  async connect(server: Server): Promise<void> {
    this.db = DatabaseFactory.createDatabase(server);
    await this.db.connect(server);
  }

  async executeQuery(query: string): Promise<any> {
    if (!this.db) {
      throw new Error('Database connection not established');
    }
    return this.db.executeQuery(query);
  }
}