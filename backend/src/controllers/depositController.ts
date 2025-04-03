import { Request, Response } from 'express';
import { HttpCode, HttpError } from '../erros/erro.config';
import DepositService from "../services/depositService";
import { ImprevistError } from '../erros/ImprevistError';
import { ValidationError } from 'yup';
export default class DepositController{

    //retorna todos os dados de um deposito dado seu id
    public static async getDeposit(req: Request, res: Response): Promise<any>{
        const id = req.user?.id;
        
                try{
                    const deposit = await DepositService.getDeposit(String(id));
                    return res.status(HttpCode.OK).json(deposit);
                }catch(e: any){
                    if(e instanceof HttpError) {
                        return e.sendMessage(res);
                    } 
        
                    const classified_err = new ImprevistError();
                    return classified_err.sendMessage(res);
                }
    }

    //cria deposito
    /**
     *@function createDeposit
     * @description cria um deposito
     * @param {string} deposit.collectionPointId
     * @param {string} user.id
     * @param {Number} deposit.amountSponges
     * @param {string} deposit.imageURL
     * @returns { message: string } 
     */
    public static async createDeposit(req: Request, res: Response): Promise<any>{
        const userId = req.user?.id;
        const deposit  = req.body;
        try{
            const response = await DepositService.createDeposit(String(deposit.collectionPointId), String(userId), Number(deposit.amountSponges), String(deposit.imageURL)); //passar melhor isso depois
            return res.status(HttpCode.CREATED).json({message: response});
        }catch(e: any){
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 

            if (e instanceof ValidationError){
                return res.status(HttpCode.BAD_REQUEST).json({ message: e.errors });
            }
            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }

    //atualiza deposito, apenas adiministrador
    public static async updateDepositStatus(req: Request, res: Response) : Promise<any>{
        const id = req.deposit?.id as string;
        const { status } = req.body;

        try {

            const response = await DepositService.updateDepositStatus(String(id),status);
            return res.status(HttpCode.OK).json({message: response});
                    
        } catch (e: any) {
            if (e instanceof HttpError){
                return e.sendMessage(res);
            }

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }

    }
    

    
}