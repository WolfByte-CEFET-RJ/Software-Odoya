import { v4 } from "uuid";
import DatabaseConnection from "../database/connection/DatabaseConnection";
import CollectionPoint from "../types/collectionPoint";
import { CollectionPointNotFound, RequiredFieldsError } from "../erros/CollectionPointErros";
const knex = DatabaseConnection.getInstance();

export default class CollectionPointService {

    public static async getAllCollectionPoint() {
        const collectionPoints: CollectionPoint[] = await knex("Collection_Point").select("*");
        return collectionPoints;
    }
    
    public static async getOneCollectionPoint(id: string) {

        const collectionPoint: CollectionPoint = await knex("Collection_Point").select("*").where({id}).first();

        if(!collectionPoint) {
            throw new CollectionPointNotFound();
        }

        return collectionPoint;
    
    }
    
    public static async createCollectionPoint(requestBody: CollectionPoint) {
        const { name, location, amountSponges, capacitySponges, lastCollectionDate, nextCollectionDate, isInactive } = requestBody;

        if(!name || !location) {
            throw new RequiredFieldsError();
        }
        
        await knex("Collection_Point").insert({
            id: v4(),
            name,
            location,
            amountSponges,
            capacitySponges,
            lastCollectionDate,
            nextCollectionDate,
            isInactive
        })
        
        return {"message": "Ponto de Coleta criado"};
    }
}