import { NextFunction, Request, Response } from 'express';
import ReportService from '../services/reportService';
import { HttpCode } from "../erros/erro.config";
import { InvalidDateRange } from '../erros/ReportErros';


export default class ReportController{

    public static async getMonthlySpongeReport(req: Request, res: Response, next: NextFunction): Promise<any>{
        const { startDate, endDate } = req.body;

        let sDate: Date;
        let eDate: Date;

        try {
            if (startDate) {
                const parsedStart = new Date(startDate);
                if (isNaN(parsedStart.getTime())) throw new Error("startDate inválida");
                // Ajusta para primeiro dia do mês
                sDate = new Date(parsedStart.getFullYear(), parsedStart.getMonth(), 1);
            } else {
                sDate = new Date("2025-01-01"); // data mínima possível
            }

            if (endDate) {
                const parsedEnd = new Date(endDate);
                if (isNaN(parsedEnd.getTime())) throw new Error("endDate inválida");
                // Ajusta para primeiro dia do mês seguinte (fim exclusivo)
                eDate = new Date(parsedEnd.getFullYear(), parsedEnd.getMonth() + 1, 1);
            } else {
                const now = new Date();
                eDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            }

            if(startDate > endDate){
                throw new InvalidDateRange();
            }

            const report = await ReportService.getMonthlySpongeReport(
                sDate,
                eDate
            );

            res.status(HttpCode.OK).json(report);
        }catch(e: any){
            next(e);
        }
    }
}