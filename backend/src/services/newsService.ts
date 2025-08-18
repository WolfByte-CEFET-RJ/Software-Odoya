import DatabaseConnection from "../database/connection/DatabaseConnection";
import { MissinngDataError } from "../erros/CommonErros";
import { NewsMonthLimitError, NewsNotFound } from "../erros/NewsError";
import Newsletter from "../types/newsletter";

const knex = DatabaseConnection.getInstance()

/**
 * @class NewsService
 * @description Serviço para Newsletters
 */
export default class NewsService{

    /**
     * Valida a data de criação de uma newsletter.
     * - Garante que não existam mais de 2 newsletters no mesmo mês.
     * - Se o limite for atingido, lança um erro `NewsMonthLimitError`.
     * 
     * @private
     * @param {Date} date - Data da newsletter a ser validada.
     * @throws {NewsMonthLimitError} Caso já existam 2 newsletters no mesmo mês.
     */
    private static async validateNewsDate(date:Date) {
        
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth() + 1; // soma pra ir de 0 a 12

        // Contar quantas newsletters já existem no mês
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0); // último dia do mês

        const existing = await knex("Newsletter")
            .whereBetween("date", [startOfMonth, endOfMonth])
            .count<{ count: number }>("id as count")
            .first();

        if (existing && existing.count >= 2) {
            throw new NewsMonthLimitError()
        }
    }

    /**
     * @description Cria uma nova newsletter no banco de dados.
     * @param {Newsletter} newsletter - Objeto com os dados da newsletter.
     * @returns {Promise<String>}
     */
    public static async createNews(newsletter: Newsletter): Promise<String>{

        await this.validateNewsDate(newsletter.date)
        
        await knex("Newsletter").insert(newsletter)

        return "Newsletter registrada";
    }

    /**
     * @description Exclui uma newsletter dado seu ID.
     * @param {string} id - Identificador único da newsletter.
     * @returns {Promise<String>}
     */
    public static async deleteNews(id: string): Promise<String>{

        if (!id) {
            throw new MissinngDataError("Identificador não fornecido");
        }

        // Validação de existência da newsletter
        await this.getNews(id);
        
        await knex("Newsletter").where({id:id}).del()

        return "Newsletter excluída";
    }

    /**
     * @description Retorna uma newsletter dado seu ID
     * @param {string} id - Identificador único da newsletter.
     * @returns {Promise<Newsletter>}
     */
    public static async getNews(id: string): Promise<Newsletter> {
        
        if (!id) {
            throw new MissinngDataError("Identificador não fornecido");
        }

        const newsletter = await knex("Newsletter")
            .where({ id })
            .first();

        if(!newsletter){
            throw new NewsNotFound();
        }

        return newsletter
    }

    /**
     * @description Retorna todas as newsletters cadastradas
     * @returns {Promise<Newsletter[]>}
     */
    public static async getAllNews(): Promise<Newsletter[]> {
        
        const newsletters = await knex("Newsletter").select("*");

        if(newsletters.length === 0){
            throw new NewsNotFound();
        }

        return newsletters;
    }

}