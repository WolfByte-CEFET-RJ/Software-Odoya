import { Request, Response } from "express";
import { HttpCode, HttpError } from "../erros/erro.config";
import CollectionPointService from "../services/collectionPointService";
import CollectionPoint from "../types/collectionPoint";
import { ImprevistError } from "../erros/ImprevistError";
import { ValidationError } from "yup";


export default class CollectionPointController {

    public static async getAllCollectionPoint(req: Request, res: Response) {
        try {
            const collectionPoints: CollectionPoint[] = await CollectionPointService.getAllCollectionPoint();
            res.status(HttpCode.OK).json(collectionPoints);
        } catch (e: any) {
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 
            
            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }

    public static async getOneCollectionPoint(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const collectionPoint: CollectionPoint = await CollectionPointService.getOneCollectionPoint(id);
            res.status(HttpCode.OK).json(collectionPoint);

        } catch (e: any) {
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 
            
            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }

    }

    public static async createCollectionPoint(req: Request, res: Response): Promise<any> {
        const requestBody: CollectionPoint = req.body;

        try {
            const response = await CollectionPointService.createCollectionPoint(requestBody);
            res.status(HttpCode.CREATED).json(response);
        } catch (e) {
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
    public static async updateCollectionPoint(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try{
            const data = req.body;
            
            const response = await CollectionPointService.updateCollectionPoint(id, data);
            return res.status(HttpCode.OK).send({ message : response });
        }catch(e){
            if(e instanceof HttpError){   
                return e.sendMessage(res);
            }

            if (e instanceof ValidationError){
                return res.status(HttpCode.BAD_REQUEST).json({ message: e.errors });
            }

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }

    /**
     * @method deleteCollectionPoint
     * @description Remove um ponto de coleta específico pelo ID
     * @param {Request} req - Objeto de requisição Express
     * @param {Response} res - Objeto de resposta Express
     */
    public static async deleteCollectionPoint(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await CollectionPointService.deleteCollectionPoint(id);
            res.status(HttpCode.NO_CONTENT).send();
        } catch (e) {
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 
            
            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }

}