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
    client: 'pg',
    connection: {
      host: 'dpg-cp8jh8kf7o1s739kc6j0-a.oregon-postgres.render.com',
      user: 'root',
      password: 'LvDXYzoDkgbgIaccjGuTFA5cCQ9UqgcY',
      database: 'facturacion_jcze',
      port: 5432,
      ssl: { rejectUnauthorized: false } // Habilita SSL
    }
  };

  async connect(): Promise<string> {
    this.db = knex(this.config3);

    try {
      await this.db.raw('select 1+1 as result');
      return 'Connected to database successfully';
    } catch (err) {
      throw new Error('Error connecting to database: ${err.message}');
    }
  }


  async executeQuery(query: string): Promise<any> {
    if (!this.db) {
      throw new Error('Database connection not established');
    }
  
    try {
      const result = await this.db.raw(query);
      /* // Verifica el cliente y accede a los resultados de la consulta de la manera apropiada
      return this.config3.client === 'pg' ? result.rows : result[0]; */
      console.log(result);
      
      // Accede a los resultados de la consulta
      return result.rows;
    } catch (err) {
        console.log(err);
    }
  }
}