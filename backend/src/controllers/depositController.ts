import { Request, Response } from 'express';
import { HttpCode, HttpError } from '../erros/erro.config';
import DepositService from "../services/depositService";
import { ImprevistError } from '../erros/ImprevistError';
import { ValidationError } from 'yup';
export default class DepositController{

    //retorna todos os dados de um deposito dado seu id
    public static async getDeposit(req: Request, res: Response): Promise<any>{
        const id = req.deposit?.userId;
        
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
    //cria deposito, apenas usuario normal
    public static async createDeposit(req: Request, res: Response): Promise<any>{
        const deposit  = req.deposit;
        try{
            const response = await DepositService.createDeposit(String(deposit?.collectionPointId), String(deposit?.userId), Number(deposit?.amountSponges), String(deposit?.imageURL)); //passar melhor isso depois
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

    //atualiza deposito sem atualizar o status, nível usuário
    public static async updateDeposit(req: Request, res: Response){

    }
    //atualiza deposito apenas adiministrador
    public static async updateDepositStatus(req: Request, res: Response){

    }
    
    //deleta deposito apenas super root
    public static async deleteDeposit(req: Request, res: any){

    }

    
}