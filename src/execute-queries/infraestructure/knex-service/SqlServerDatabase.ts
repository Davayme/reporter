import { Server } from '@prisma/client';
import { Knex } from 'knex';
import knex from 'knex';
import { DatabaseInterface } from './IDatabase';
export class SqlServerDatabase implements DatabaseInterface{
    private db: Knex;

    async connect(server: Server): Promise<void> {
        const connectionConfig = {
            driver: 'msnodesqlv8',
            server: server.string_url,
            port: server.port,
            database: server.database,
            user: server.user,
            password: server.password,
            options: {
                enableArithAbort: true,
            },
        };

        const config = {
            client: 'mssql',
            connection: connectionConfig,
        };

        this.db = knex(config);

        try {
            await this.db.raw('SELECT 1');
        } catch (err) {
            throw new Error(`Error connecting to SQL Server database: ${err.message}`);
        }
    }

    async executeQuery(query: string): Promise<any> {
        if (!this.db) {
            throw new Error('Database connection not established');
        }

        try {
            const result = await this.db.raw(query);
            return result.rows || result; // Para SQL Server con Knex, los resultados pueden estar en la propiedad 'rows' o directamente en el resultado
        } catch (err) {
            throw new Error(`Error executing query: ${err.message}`);
        }
    }
}