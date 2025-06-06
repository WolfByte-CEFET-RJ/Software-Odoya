import { NextFunction, Request, response, Response } from "express";
import { HttpCode } from "../erros/erro.config";
import { MetricsService } from "../services/metricsService";
import Metrics from "../types/metrics";

export default class MetricsController{

    public static async getMetrics(req: Request, res: Response, next: NextFunction) {
        try{
            const metrics = await MetricsService.getMetrics();
            res.status(HttpCode.OK).json(metrics);

        } catch(e: any){
            next(e);
        }
    }

    public static async updateMetrics(req: Request, res: Response, next: NextFunction) {
        try{
            const { climateInitiatives, livesImpacteds, kgRecycled, partners }
                : Partial<Metrics> = req.body;

            const message = await MetricsService.updateMetrics({ climateInitiatives, livesImpacteds, kgRecycled, partners });

            res.status(HttpCode.OK).json({message});

        } catch(e: any){
            next(e);
        }
    }

}