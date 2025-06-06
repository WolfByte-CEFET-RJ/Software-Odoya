import { Router } from "express";
import MetricsController from "../controllers/metricsController";

const metricsRouter = Router();

metricsRouter
    /**
     * @route GET /metrics
     * @description Retorna métricas de extensão, sustentabilidade e parceiros
     * @returns { Metrics } 
     */
    .get("/metrics", MetricsController.getMetrics)


export default metricsRouter;

