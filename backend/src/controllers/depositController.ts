import { HttpCode, HttpError } from '../erros/erro.config';
import Deposit from "../types/deposit";
import { NextFunction, Request, Response } from 'express';
import DepositService from "../services/depositService";
import FileService from "../services/FileService";
import { v4 } from "uuid";

export default class DepositController{

    public static async getDeposit(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const id = req.user?.id
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 9;

            const data = await DepositService.getDeposit(page, limit,String(id));
            const totalPages = Math.ceil(parseInt(data[0].total.toString(), 10) / limit);
            const amount = data[0].total;
            const deposits: any[] = data.map(({ total, ...deposit }) => deposit);
            return res.status(HttpCode.OK).json({amount: amount, totalPages: totalPages, deposits});
        
        } catch(e: any){
            next(e);
        }
    }

    public static async getAllDeposits(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 9;
            const data: (Deposit & {total : number})[] = await DepositService.getAllDeposits(page, limit, id);

            const totalPages = Math.ceil(parseInt(data[0].total.toString(), 10) / limit); //Calcula o Total de páginas necessárias
            const deposits: Deposit[] = data.map(({ total, ...deposit }) => deposit); //retira o total dos usuários
            
            res.status(HttpCode.OK).json({amount: deposits.length, totalPages: totalPages, deposits});

        } catch (e: any) {
            next(e);
        }
    }

    public static async getSearchDeposit(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const name  = req.query.name as string;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 9;

            const data: (Deposit & {total : number})[] = await DepositService.getSearchDeposit(page, limit, id, name);
            
            if(data.length === 0){
                res.status(HttpCode.OK).json({amount: 0, totalPages: 0, deposits: []});
            }
            else{
                const totalPages = Math.ceil(parseInt(data[0].total.toString(), 10) / limit); //Calcula o Total de páginas necessárias
                const deposits: Deposit[] = data.map(({ total, ...deposit }) => deposit); //retira o total dos usuários
                res.status(HttpCode.OK).json({amount: deposits.length, totalPages: totalPages, deposits});
            }
            

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


    /**
     * @function createDeposit
     * @description cria um deposito
     * @param {string} deposit.collectionPointId
     * @param {string} user.id
     * @param {Number} deposit.amountSponges
     * @param {string} deposit.imageURL
     * @returns { message: string } 
     */
  
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