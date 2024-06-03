import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import knex from 'knex';
import { Server } from '@prisma/client';

@Injectable()
export class DatabaseService {
  private db: Knex;

  private getConfig(server: Server): any {
    const connectionConfig = {
      host: server.string_url,
      user: server.user,
      password: server.password,
      database: server.database,
      port: server.port,
      ssl: server.ssl ? { rejectUnauthorized: false } : undefined,
    };

    switch (server.type_bd) {
      case 'mysql':
        return {
          client: 'mysql',
          connection: connectionConfig,
        };
      case 'pg':
        return {
          client: 'pg',
          connection: connectionConfig,
        };
      case 'oracle':
        return {
          client: 'oracledb',
          connection: connectionConfig,
        };
      case 'sqlserver':
        return {
          client: 'mssql',
          connection: connectionConfig,
        };
      default:
        throw new Error('Unsupported database type');
    }
  }

  async connect(server: Server): Promise<void> {
    const config = this.getConfig(server);
    this.db = knex(config);

    try {
      await this.db.raw('SELECT 1');
    } catch (err) {
      throw new Error(`Error connecting to database: ${err.message}`);
    }
  }

  async executeQuery(query: string): Promise<any> {
    if (!this.db) {
      throw new Error('Database connection not established');
    }

    try {
      const result = await this.db.raw(query);
      return result.rows ? result.rows : result[0];
    } catch (err) {
      throw new Error(`Error executing query: ${err.message}`);
    }
  }
}
