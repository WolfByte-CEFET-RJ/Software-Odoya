import { v4 } from "uuid";
import DatabaseConnection from "../database/connection/DatabaseConnection";
import CollectionPoint from "../types/collectionPoint";
import { CollectionPointNotFound, CollectionPointWithDepositsError, RequiredFieldsError } from "../erros/CollectionPointErros";
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

    /**
     * @method deleteCollectionPoint
     * @description Remove um ponto de coleta específico pelo ID, se não houver depósitos associados
     * @param {string} id - ID do ponto de coleta a ser removido
     * @throws {CollectionPointNotFound} Se o ponto de coleta não for encontrado
     * @throws {CollectionPointWithDepositsError} Se existirem depósitos associados ao ponto de coleta
     */
    public static async deleteCollectionPoint(id: string) {
        const collectionPoint = await knex("Collection_Point").where({ id }).first();
        
        if (!collectionPoint) {
            throw new CollectionPointNotFound();
        }
        
        const deposits = await knex("Deposit").where({ collectionPointId: id }).first();
        
        if (deposits) {
            throw new CollectionPointWithDepositsError();
        }
        
        const deletedCount = await knex("Collection_Point").where({ id }).delete();
        
        if (deletedCount === 0) {
            throw new CollectionPointNotFound();
        }
        
        return true;
    }
}