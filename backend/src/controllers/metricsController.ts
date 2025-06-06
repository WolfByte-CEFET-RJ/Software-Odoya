import { NextFunction, Request, response, Response } from "express";
import { HttpCode } from "../erros/erro.config";
import { MetricsService } from "../services/metricsService";

export default class MetricsController{

    public static async getMetrics(req: Request, res: Response, next: NextFunction) {
        try{
            const metrics = await MetricsService.getMetrics();
            res.status(HttpCode.OK).json(metrics);

        } catch(e: any){
            next(e);
        }
    }

}