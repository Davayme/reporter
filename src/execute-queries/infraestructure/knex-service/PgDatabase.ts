import knex, { Knex } from 'knex';
import { Server } from '@prisma/client';
import { DatabaseInterface } from './IDatabase';

export class PgDatabase implements DatabaseInterface {
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
      client: 'pg',
      connection: connectionConfig,
    };

    this.db = knex(config);

    try {
      await this.db.raw('SELECT 1');
    } catch (err) {
      throw new Error(`Error connecting to PostgreSQL database: ${err.message}`);
    }
  }

  async executeQuery(query: string): Promise<any> {
    if (!this.db) {
      throw new Error('Database connection not established');
    }

    try {
      const result = await this.db.raw(query);
      return result.rows;
    } catch (err) {
      throw new Error(`Error executing query: ${err.message}`);
    }
  }
}