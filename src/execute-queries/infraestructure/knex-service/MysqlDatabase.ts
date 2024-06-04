import { Knex } from 'knex';
import { Server } from '@prisma/client';
import { DatabaseInterface } from './IDatabase';
import knex from 'knex';

export class MysqlDatabase implements DatabaseInterface {
  private db: Knex;

  async connect(server: Server): Promise<void> {
    const connectionConfig = {
      host: server.string_url,
      user: server.user,
      password: server.password,
      database: server.database,
      port: server.port,
      ssl: server.ssl ? { rejectUnauthorized: false } : undefined,
    };

    const config = {
      client: 'mysql',
      connection: connectionConfig,
    };

    this.db = knex(config);

    try {
      await this.db.raw('SELECT 1');
    } catch (err) {
      throw new Error(`Error connecting to MySQL database: ${err.message}`);
    }
  }

  async executeQuery(query: string): Promise<any> {
    if (!this.db) {
      throw new Error('Database connection not established');
    }
  
    try {
      const result = await this.db.raw(query);
      return result[0];
    } catch (err) {
      throw new Error(`Error executing query: ${err.message}`);
    }
  }
}