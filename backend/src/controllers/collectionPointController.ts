import { NextFunction, Request, Response } from "express";
import { HttpCode } from "../erros/erro.config";
import CollectionPointService from "../services/collectionPointService";
import CollectionPoint, { UpdateCollectionPoint } from "../types/collectionPoint";
import { GeocodeError } from "../erros/CollectionPointErros";

export default class CollectionPointController {

    public static async getAllCollectionPoint(req: Request, res: Response, next: NextFunction) {
        try {
            const collectionPoints: CollectionPoint[] = await CollectionPointService.getAllCollectionPoint();
            res.status(HttpCode.OK).json(collectionPoints);
            
        } catch (e: any) {
            next(e);
        }
    }

    public static async getOneCollectionPoint(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            
            const collectionPoint: CollectionPoint = await CollectionPointService.getOneCollectionPoint(id);
            res.status(HttpCode.OK).json(collectionPoint);

        } catch (e: any) {
            next(e);
        }
    }

    public static async createCollectionPoint(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const requestBody: CollectionPoint = req.body;
            
            const response = await CollectionPointService.createCollectionPoint(requestBody);
            res.status(HttpCode.CREATED).json({message: response});
        
        } catch (e: any) {
            next(e);
        }
    }
    
    public static async updateCollectionPoint(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const { name, location, capacitySponges, amountSponges, lastCollectionDate, nextCollectionDate, isInactive }: UpdateCollectionPoint = req.body;
            
            const response = await CollectionPointService.updateCollectionPoint(
                id, 
                { name, location, capacitySponges, amountSponges, lastCollectionDate, nextCollectionDate, isInactive }
            );
            return res.status(HttpCode.OK).send({ message : response });
        
        }catch(e: any){
            next(e);
        }
    }

    public static async deleteCollectionPoint(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            
            await CollectionPointService.deleteCollectionPoint(id);
            res.status(HttpCode.NO_CONTENT).send();

        } catch (e: any) {
            next(e);
        }
    }

    
    public static async getGeocode(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            const collection: CollectionPoint = await CollectionPointService.getOneCollectionPoint(id);

            const url = `https://nominatim.openstreetmap.org/search?q=${collection.location}&format=json`;

            const response = await fetch(url, {
                headers: {
                    'User-Agent': `odoya/1.0 ${process.env.EMAIL_APP_USER}`
                }
            }).catch((e: any)=>{
                throw new GeocodeError(e.message);
            })

            const data = await response.json();
            res.json({lat: data[0].lat, lon: data[0].lon});

        } catch (e) {
            next(e)
        }
    }
}