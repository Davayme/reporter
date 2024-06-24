import { Server } from "@prisma/client";
import { DatabaseInterface } from "./IDatabase";
import { MysqlDatabase } from "./MysqlDatabase";
import { PgDatabase } from "./PgDatabase";
import { SqlServerDatabase } from "./SqlServerDatabase";
import { OracleDatabase } from "./OracleDatabase";

export class DatabaseFactory {
  private static databaseMap: { [key: string]: () => DatabaseInterface } = {
    'mysql': () => new MysqlDatabase(),
    'pg': () => new PgDatabase(),
    'sqlserver': () => new SqlServerDatabase(),
    'oracle': () => new OracleDatabase(),
  };

  static createDatabase(server: Server): DatabaseInterface {
    const databaseCreator = this.databaseMap[server.type_bd];
    if (!databaseCreator) {
      throw new Error('Unsupported database type');
    }
    return databaseCreator();
  }
}