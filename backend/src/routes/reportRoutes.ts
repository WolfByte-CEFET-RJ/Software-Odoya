import { Router } from 'express';
import ReportController from '../controllers/reportController';
//import AuthMiddleware from '../middlewares/authMiddleware';

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
 * `startYear`, `startMonth`       | Retorna os dados desde o mês e ano informados até o presente momento.
 * `startYear`, `startMonth`, `endYear`, `endMonth` | Retorna o intervalo entre os meses e anos informados.
 * 
 * @param {number} [startYear] Ano inicial (opcional)
 * @param {number} [startMonth] Mês inicial (opcional)
 * @param {number} [endYear] - Ano final (opcional)
 * @param {number} [endMonth] - Mês final (opcional)
 * 
 * @returns {Array< number >} Array com os totais mensais de esponjas
 */
reportRouter.post('/reports/monthly-sponge', ReportController.getMonthlySpongeReport);
// APENAS ADMIN????? 


export default reportRouter;