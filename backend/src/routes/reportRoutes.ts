import { Router } from 'express';
import ReportController from '../controllers/reportController';
import AuthMiddleware from '../middlewares/authMiddleware';

const reportRouter = Router();
/**
 * @route POST /reports/monthly-sponge
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
 * @returns {Array<{ year: number, month: number, total_sponges_collected: number }>}
 */
reportRouter.post('/reports/monthly-sponge', AuthMiddleware.ensureAdmin, ReportController.getMonthlySpongeReport);


export default reportRouter;