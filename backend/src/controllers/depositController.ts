

import Deposit from "../types/deposit";
import { Request, Response } from 'express';
import { HttpCode, HttpError } from '../erros/erro.config';
import DepositService from "../services/depositService";
import { ImprevistError } from '../erros/ImprevistError';
import { ValidationError } from 'yup';
export default class DepositController{

    
    /**
    * Obtém todos os depósitos de um usuário comum ou todos os depósitos para admin
    * @function getAllDeposits
    * @description Obtém todos os depósitos de um usuário comum ou todos os depósitos para admin
    * @param req.user.admin - Indica se o usuário é administrador
    * @param req.user.Id - ID do usuário
    * @returns {Deposit[]} - Lista de depósitos
    * @throws {HttpError} - Erro de HTTP
     */
    public static async getAllDeposits(req: Request, res: Response) {
        try {
            // Verifica se o usuário é admin através do middleware
            const isAdmin = req.user?.admin || false;
            const userId = req.user?.id as string;

            const deposits: Deposit[] = await DepositService.getAllDeposits(userId, isAdmin);
            res.status(HttpCode.OK).json(deposits);
        } catch (e) {
            if (e instanceof HttpError) {
                return e.sendMessage(res);
            }

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }

    /**
    * Obtém um depósito específico
    * @function getOneDeposit
    * @description Obtém um depósito específico
    * @param id ID do depósito
    * @param {boolean} req.user.admin - Indica se o usuário é administrador
    * @param isAdmin Indica se o usuário é administrador
    */
    public static async getOneDeposit(req: Request, res: Response) {
        const { id } = req.params;

        try {
            // Verifica se o usuário é admin através do middleware
            const isAdmin = req.user?.admin || false;
            const userId = req.user?.id as string;

            const deposit: Deposit = await DepositService.getOneDeposit(id, userId, isAdmin);
            res.status(HttpCode.OK).json(deposit);
        } catch (e) {
            if (e instanceof HttpError) {
                return e.sendMessage(res);
            }

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }
    //retorna todos os dados de um deposito dado seu id
    /**
     * @function getDeposit
     * @description Retorna todos os dados de um depósito dado seu ID
     * @param {id} req.deposit
     * @returns {Deposit} - Dados do depósito
     * @throws {HttpError} - Erro de HTTP
     */
    public static async getDeposit(req: Request, res: Response): Promise<any>{
        const id = req.deposit?.id;
        
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