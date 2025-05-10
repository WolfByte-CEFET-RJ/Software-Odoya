

import Deposit from "../types/deposit";
import { Request, Response } from 'express';
import { HttpCode, HttpError } from '../erros/erro.config';
import DepositService from "../services/depositService";
import { ImprevistError } from '../erros/ImprevistError';
import { ValidationError } from 'yup';
import multer from "multer";
import FileService from "../services/FileService";
import { v4 } from "uuid";

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

    /**
     * @function createDeposit
     * @description cria um deposito
     * @param {string} deposit.collectionPointId
     * @param {string} user.id
     * @param {Number} deposit.amountSponges
     * @param {string} deposit.imageURL
     * @returns { message: string } 
     */
    public static async createDeposit(req: Request, res: Response): Promise<any> {
        const userId = req.user?.id;
        const { collectionPointId, amountSponges } = JSON.parse(req.body.depositData);;
        const image = req.file;  // O arquivo de imagem será armazenado em req.file devido ao multer

        if (!image) {
            return res.status(HttpCode.BAD_REQUEST).json({ message: "Comprovante de imagem é obrigatório." });
        }

        try{

            const depositId: string = v4()

            FileService.setStrategy(null)
            const imageUrl = await FileService.upload(image.buffer, depositId);
            console.log(imageUrl)

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
            if (e instanceof HttpError) {
                return e.sendMessage(res);
            }

            if (e instanceof ValidationError) {
                return res.status(HttpCode.BAD_REQUEST).json({ message: e.errors });
            }

            const classifiedErr = new ImprevistError();
            return classifiedErr.sendMessage(res);
        }
    }

    /**
     * @function updateDepositStatus
     * @description atualiza status do deposito
     * @param {string} deposit.collectionPointId
     * @param {string} status
     * @returns { message: string } 
     */
    public static async updateDepositStatus(req: Request, res: Response) : Promise<any>{
        const { id, status } = req.body;
        try {
            const response = await DepositService.updateDepositStatus(String(id),String(status));
            return res.status(HttpCode.OK).json({message: response});
        } catch (e: any) {
            if (e instanceof HttpError){
                return e.sendMessage(res);
            }

             // Captura o erro de validação do Yup e envia a mensagem diretamente
        if (e instanceof ValidationError) {
            return res.status(HttpCode.BAD_REQUEST).json({ message: e.errors[0] });
        }

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }
}