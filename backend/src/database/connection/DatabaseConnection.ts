import knex, { Knex } from 'knex';
import DatabaseConfig from '../config/DatabaseConfig';

class DatabaseConnection {
  private static instance: Knex | null = null;

  public static getInstance(): Knex {
    if (!this.instance) {
      this.instance = knex(DatabaseConfig.getConfig());
    }
    return this.instance;
  }

  public static async testConnection(): Promise<boolean> {
    try {
      const connection = this.getInstance();
      await connection.raw('SELECT 1');
      console.log('Database connection successful!');
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  public static async closeConnection(): Promise<void> {
    if (this.instance) {
      await this.instance.destroy();
      this.instance = null;
    }
  }
}

export default DatabaseConnection;