import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

class DatabaseConfig {
  private static config: Knex.Config = {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, '..', 'seeds')
    }
  };

  public static getConfig(): Knex.Config {
    return this.config;
  }
}

export default DatabaseConfig;