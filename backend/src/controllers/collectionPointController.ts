import { Request, Response } from "express";
import { HttpCode, HttpError } from "../erros/erro.config";
import CollectionPointService from "../services/collectionPointService";
import CollectionPoint from "../types/collectionPoint";
import { ImprevistError } from "../erros/ImprevistError";


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

    public static async createCollectionPoint(req: Request, res: Response) {
        const requestBody: CollectionPoint = req.body;

        try {
            const response = await CollectionPointService.createCollectionPoint(requestBody);
            res.status(HttpCode.CREATED).json(response);
        } catch (e) {
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 
            
            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }


}