import { Knex } from 'knex';
import { Server } from '@prisma/client';
import knex from 'knex';
import { DatabaseInterface } from './IDatabase';

export class OracleDatabase implements DatabaseInterface {
  private db: Knex;

  async connect(server: Server): Promise<void> {
    const connectionConfig = {
      user: server.user,
      password: server.password,
      connectString: `${server.string_url}:${server.port}/${server.database}`,
    };

    const config = {
      client: 'oracledb',
      connection: connectionConfig,
    };

    this.db = knex(config);

    try {
      await this.db.raw('SELECT 1 FROM DUAL');
    } catch (err) {
      throw new Error(`Error connecting to Oracle database: ${err.message}`);
    }
  }

  async executeQuery(query: string): Promise<any> {
    if (!this.db) {
      throw new Error('Database connection not established');
    }

    try {
      const result = await this.db.raw(query);
      return result.rows || result; // Para Oracle con Knex, los resultados pueden estar en la propiedad 'rows' o directamente en el resultado
    } catch (err) {
      throw new Error(`Error executing query: ${err.message}`);
    }
  }
}