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
     * `startDate` (formato `YYYY-MM`) | Retorna os dados desde o mês e ano informados até o presente momento.
     * `startDate` e `endDate` (formato `YYYY-MM`) | Retorna o intervalo entre os meses e anos informados.
     * 
     * @param {string} [startDate] Data inicial no formato `YYYY-MM` (opcional)
     * @param {string} [endDate] Data final no formato `YYYY-MM` (opcional)
     * 
     * @returns {Promise<Array<{ year: number, month: number, total_sponges_collected: number }>>} 
     */
    public static async getMonthlySpongeReport(
            startDate: Date, 
            endDate: Date
        ): Promise<Array<{ year: number, month: number, total_sponges_collected: number }>> 
        {
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
        .orderByRaw('year, month');

        if (!rows || rows.length === 0) {
            throw new ReportNotFound();
        }

        const filledResults = [];

        // Início do primeiro mês
        let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

        for (const row of rows) {
            const rowYear = Number(row.year);
            const rowMonth = Number(row.month);

            // Data do mês retornado
            const rowDate = new Date(rowYear, rowMonth - 1, 1);

            // Preencher meses faltando até o mês atual da row
            while (current < rowDate) {
                filledResults.push({
                    year: current.getFullYear(),
                    month: current.getMonth() + 1,
                    total_sponges_collected: 0,
                });
                current.setMonth(current.getMonth() + 1);
            }

            // Adiciona o mês retornado do banco
            filledResults.push({
                year: rowYear,
                month: rowMonth,
                total_sponges_collected: Number(row.total_sponges_collected),
            });

            // Move para o próximo mês
            current.setMonth(current.getMonth() + 1);
        }

        // Preenche até endDate, se necessário
        while (current < endDate) {
            filledResults.push({
                year: current.getFullYear(),
                month: current.getMonth() + 1,
                total_sponges_collected: 0,
            });
            current.setMonth(current.getMonth() + 1);
        }
        return filledResults;
    }
}