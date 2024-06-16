import { Injectable } from '@nestjs/common';
import { Server } from '@prisma/client';
import { DatabaseInterface } from './IDatabase';
import { MysqlDatabase } from './MysqlDatabase';
import { PgDatabase } from './PgDatabase';
import { OracleDatabase } from './OracleDatabase';
import { SqlServerDatabase } from './SqlServerDatabase';

@Injectable()
export class KnexService {
  private db: DatabaseInterface;

  async connect(server: Server): Promise<void> {
    switch (server.type_bd) {
      case 'mysql':
        this.db = new MysqlDatabase();
        break;
      case 'pg':
        this.db = new PgDatabase();
        break;
      case 'sqlserver':
        this.db = new SqlServerDatabase();
        break;
      case 'oracle':
        this.db = new OracleDatabase();
        break;
      default:
        throw new Error('Unsupported database type');
    }

    await this.db.connect(server);
  }

  async executeQuery(query: string): Promise<any> {
    if (!this.db) {
      throw new Error('Database connection not established');
    }
    return this.db.executeQuery(query);
  }
}