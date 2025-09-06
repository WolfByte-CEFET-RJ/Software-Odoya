import DatabaseConnection from '../database/connection/DatabaseConnection';
import { ReportNotFound } from '../erros/ReportErros';

const knex = DatabaseConnection.getInstance();


export default class ReportService {

    /**
     * @description Retorna o total de esponjas coletadas por mês, agrupando os depósitos aprovados
     * por ano e mês com base na data de criação (`created_at`).
     *
     * Os resultados serão ordenados por **ano** e **mês** em ordem **ascendente**,
     * ou seja, do mês mais antigo para o mais recente.
     * 
     * **Parâmetros Recebidos**        | **Resultado**
     * --------------------------------|-------------------------------------
     * Nenhum                          | Retorna todo o histórico de depósitos aprovados.
     * `startYear`, `startMonth`       | Retorna os dados desde o mês e ano informados até o presente momento.
     * `startYear`, `startMonth`, `endYear`, `endMonth` | Retorna o intervalo entre os meses e anos informados.
     * 
     * @param {number} [startYear] Ano inicial (opcional)
     * @param {number} [startMonth] Mês inicial (opcional)
     * @param {number} [endYear] - Ano final (opcional)
     * @param {number} [endMonth] - Mês final (opcional)
     * 
     * @returns {Promise<Array< number >>} Array com os totais mensais de esponjas
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
            knex.raw('SUM(amountSponges) AS total_sponges_collected')
        )
        .where('status', 'APROVADO')
        .andWhere('created_at', '>=', startDate)
        .andWhere('created_at', '<', endDate)
        .groupByRaw('EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)')
        .orderByRaw('EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)');

        if (!rows || rows.length === 0) {
            throw new ReportNotFound();
        }

        return rows.map(row => Number(row.total_sponges_collected));
    }
}