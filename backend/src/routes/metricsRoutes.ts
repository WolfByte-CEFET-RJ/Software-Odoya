import { Router } from "express";
import MetricsController from "../controllers/metricsController";
import AuthMiddleware from "../middlewares/authMiddleware";

const metricsRouter = Router();

metricsRouter
    /**
     * @route GET /metrics
     * @description Retorna métricas de extensão, sustentabilidade e parceiros
     * @returns { Metrics } 
     */
    .get("/metrics", MetricsController.getMetrics)

    /**
     * @route PATCH /metrics
     * @description Atualiza as métricas de extensão, sustentabilidade e parceiros
     * @param {Partial<Metrics>}
     * @returns { message: string } 
     */
    .patch("/metrics", AuthMiddleware.ensureAdmin, MetricsController.updateMetrics)


export default metricsRouter;

