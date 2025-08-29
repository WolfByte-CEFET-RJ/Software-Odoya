import { Router } from 'express';
import ReportController from '../controllers/reportController';
//import AuthMiddleware from '../middlewares/authMiddleware';

const reportRouter = Router();
/**
 * @route POST /reports/monthly-sponge
 * @description
 * Retorna o total de esponjas coletadas por mês, agrupando os depósitos com status "APROVADO"
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
 * @returns {Array<{ year: number, month: number, total_sponges_collected: number }>}
 * Um array com os totais de esponjas coletadas por mês, ordenado do mais recente para o mais antigo.
 */
reportRouter.post('/reports/monthly-sponge', ReportController.getMonthlySpongeReport);
// APENAS ADMIN????? 


export default reportRouter;