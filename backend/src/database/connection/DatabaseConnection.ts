import knex, { Knex } from 'knex';
import DatabaseConfig from '../config/DatabaseConfig';

/**
 * Classe responsável pela configuração e gerenciamento da conexão com o banco de dados.
 */
class DatabaseConnection {
  private static instance: Knex | null = null;

  /**
   * Retorna a instância do Knex.
   * @returns {Knex} Instância do Knex para interagir com o banco de dados.
   */
  public static getInstance(): Knex {
    if (!this.instance) {
      this.instance = knex(DatabaseConfig.getConfig());
    }
    return this.instance;
  }

  /**
   * Testa a conexão com o banco de dados.
   * @returns {Promise<boolean>} `true` se a conexão for bem-sucedida, `false` caso contrário.
   */
  public static async testConnection(): Promise<boolean> {
    try {
      const connection = this.getInstance();
      await connection.raw('SELECT 1');
      console.log('🎲 \tConexão com banco de dados estabelecida!!');
      return true;
    } catch (error) {
      console.error('❌ \tErro ao se conectar ao banco de dados:', error);
      return false;
    }
  }

  /**
   * Fecha a conexão com o banco de dados, caso esteja ativa.
   * @returns {Promise<void>}
   */
  public static async closeConnection(): Promise<void> {
    if (this.instance) {
      await this.instance.destroy();
      this.instance = null;
    }
  }
}

export default DatabaseConnection;