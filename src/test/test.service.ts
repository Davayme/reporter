
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import knex from 'knex';

@Injectable()
export class DatabaseService {
  private db: Knex;
  private config = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'quinto'
    }
  };
  private config2 = {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'admin',
      database: 'reporter'
    }
  };
  private config3 = {
    client: 'mssql',
    connection: {
      driver: 'msnodesqlv8',
      server: 'DESKTOP-FQ37BPD\\REPORTEADOR',
      port: 1433,
      database: 'AdventureWorksDW2022',
      user: 'sa',
      password: '12345',
      options: {
        enableArithAbort: true,
      },
    }
  };
  async connect(): Promise<string> {
    this.db = knex(this.config3);

    try {
      await this.db.raw('select 1+1 as result');
      return 'Connected to database successfully';
    } catch (err) {
      // Lanza el error capturado directamente
      throw err;
    }
  }


  async executeQuery(query: string): Promise<any> {
    if (!this.db) {
      throw new Error('Database connection not established');
    }

    try {
      const result = await this.db.raw(query);
      console.log(result);
      return result.rows || result;
    } catch (err) {
      console.log(err);
    }
  }
}