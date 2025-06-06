import Deposit from "../types/deposit";
import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../erros/erro.config';
import DepositService from "../services/depositService";
import FileService from "../services/FileService";
import { v4 } from "uuid";

export default class DepositController{

    public static async getAllDeposits(req: Request, res: Response, next: NextFunction) {
        try {
            // Verifica se o usuário é admin através do middleware
            const isAdmin = req.user?.admin || false;
            const userId = req.user?.id as string;

            const deposits: Deposit[] = await DepositService.getAllDeposits(userId, isAdmin);
            res.status(HttpCode.OK).json(deposits);

        } catch (e: any) {
            next(e);
        }
    }

    public static async getOneDeposit(req: Request, res: Response, next: NextFunction) {
        try {
            // Verifica se o usuário é admin através do middleware
            const { id } = req.params;
            const isAdmin = req.user?.admin || false;
            const userId = req.user?.id as string;

            const deposit: Deposit = await DepositService.getOneDeposit(id, userId, isAdmin);
            res.status(HttpCode.OK).json(deposit);

        } catch (e: any) {
            next(e);
        }
    }

    public static async getDeposit(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const id = req.deposit?.id;

            const deposit = await DepositService.getDeposit(String(id));
            return res.status(HttpCode.OK).json(deposit);
        
        } catch(e: any){
            next(e);
        }
    }

    public static async createDeposit(req: Request, res: Response, next: NextFunction): Promise<any> {
        
        let imageUrl;
        const depositId: string = v4()

        try{
            const userId = req.user?.id;
            const { amountSponges } = JSON.parse(req.body.depositData);
            const collectionPointId = req.params.collection_id;
            const image = req.file;

            if(image){
                FileService.setStrategy(null)
                imageUrl = await FileService.upload(image.buffer, depositId);
            }

            // Criação do depósito
            const response = await DepositService.createDeposit(
                String(depositId),
                String(collectionPointId),
                String(userId),
                Number(amountSponges),
                imageUrl
            );

            return res.status(HttpCode.CREATED).json({ message: response });

        } catch (e: any) {

            // Desfaz o upload caso tenha acontecido problemas no registro
            if(imageUrl){
                await FileService.remove(depositId);
            }

            next(e);
        }
    }

    public static async updateDepositStatus(req: Request, res: Response, next: NextFunction) : Promise<any>{
        try {
            const { status } = req.body;
            const id = req.params.collection_id;

            const response = await DepositService.updateDepositStatus(String(id),String(status));
            return res.status(HttpCode.OK).json({message: response});
        
        } catch (e: any) {
            next(e);
        }
    }
}