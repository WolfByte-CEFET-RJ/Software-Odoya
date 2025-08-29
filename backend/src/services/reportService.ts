import DatabaseConnection from '../database/connection/DatabaseConnection';


const knex = DatabaseConnection.getInstance();


export default class ReportService {

    /**
     * Retorna o total de esponjas coletadas por mês, agrupando os depósitos aprovados
     * por ano e mês com base na data de criação (`created_at`).
     *
     * Parâmetros Recebidos	    |Resultado
     * Nenhum	                |Retorna todo o histórico
     * startYear + startMonth	|Retorna daquele mês até os dados mais recentes
     * + endYear + endMonth	    |Retorna o intervalo entre os meses informados
     * 
     * @param {number} [startYear] Ano inicial (opcional)
     * @param {number} [startMonth] Mês inicial (opcional)
     * @param {number} [endYear] - Ano final (opcional)
     * @param {number} [endMonth] - Mês final (opcional)
     * 
     * @returns {Promise<Array<{ year: number, month: number, total_sponges_collected: number }>>}
     */
    public static async getMonthlySpongeReport(
        startYear?: number, startMonth?: number, endYear?: number, endMonth?: number) 
    {
        let startDate: Date;
        let endDate: Date;

        if (startYear && startMonth) {
        // Início do mês informado
        startDate = new Date(startYear, startMonth - 1, 1);

        // Se fim também for informado
        endDate = endYear && endMonth
            ? new Date(endYear, endMonth, 1)
            : new Date();
        } else {
        // Histórico completo
        startDate = new Date(0);
        endDate = new Date();
        }

        const rows = await knex('Deposit')
        .select(
            knex.raw('EXTRACT(YEAR FROM created_at) AS year'),
            knex.raw('EXTRACT(MONTH FROM created_at) AS month'),
        )
        .sum('amountSponges AS total_sponges_collected')
        .where('status', 'APROVADO')
        .andWhere('created_at', '>=', startDate)
        .andWhere('created_at', '<', endDate)
        .groupByRaw('year, month')
        .orderByRaw('year DESC, month DESC');

        return rows.map(row => ({
        year: Number(row.year),
        month: Number(row.month),
        total_sponges_collected: Number(row.total_sponges_collected),
        }));
    }
}