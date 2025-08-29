import { NextFunction, Request, Response } from 'express';
import ReportService from '../services/reportService';
import { HttpCode } from "../erros/erro.config";



export default class ReportController{

    public static async getMonthlySpongeReport(req: Request, res: Response, next: NextFunction): Promise<any>{
        const { startYear, startMonth, endYear, endMonth } = req.body;

        try {
        const report = await ReportService.getMonthlySpongeReport(
            Number(startYear), 
            Number(startMonth), 
            Number(endYear), 
            Number(endMonth)
        );

            res.status(HttpCode.OK).json(report);
        }catch(e: any){
            next(e);
        }
    }
}