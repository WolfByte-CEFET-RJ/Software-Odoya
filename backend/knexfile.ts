import { Knex } from 'knex';
import DatabaseConfig from './src/database/config/DatabaseConfig';

const config: Knex.Config = DatabaseConfig.getConfig();

export default config;