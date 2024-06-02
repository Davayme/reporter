import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import knex from 'knex';

@Injectable()
export class DatabaseService {
    private db: Knex;

    private getConfig(dbType: string, connection: any): any {
        switch (dbType) {
            case 'mysql':
                return {
                    client: 'mysql2',
                    connection,
                };
            case 'pg':
                return {
                    client: 'pg',
                    connection: {
                        ...connection,
                        ssl: connection.ssl || false,
                    },
                };
            default:
                throw new Error('Unsupported database type');
        }
    }

    async connect(dbType: string, connection: any): Promise<void> {
        const config = this.getConfig(dbType, connection);
        this.db = knex(config);

        try {
            await this.db.raw('select 1+1 as result');
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
