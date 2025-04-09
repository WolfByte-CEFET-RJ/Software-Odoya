import { v4 } from "uuid";
import DatabaseConnection from "../database/connection/DatabaseConnection";
import CollectionPoint, { UpdateCollectionPoint } from "../types/collectionPoint";
import { CollectionPointNotFound, CollectionPointWithDepositsError, RequiredCollectionPointIdError, RequiredDataError, RequiredFieldsError } from "../erros/CollectionPointErros";
import { RequiredIdError } from "../erros/UserErros";
import DateFormat from "../utils/dateFormat";
import schedule from 'node-schedule';
const knex = DatabaseConnection.getInstance();
let scheduledTasks: Record<string, schedule.Job> = {};

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
        
        const id = v4();
        await knex("Collection_Point").insert({
            id,
            name,
            location,
            amountSponges,
            capacitySponges,
            lastCollectionDate,
            nextCollectionDate,
            isInactive
        })
        
        await this.collectionPointNotification(id, nextCollectionDate);

        return {"message": "Ponto de Coleta criado"};
    }

    /**
     * @method updateCollectionPoint
     * @description Remove um ponto de coleta específico pelo ID, se não houver depósitos associados
     * @param {string} id - ID do ponto de coleta a ser removido.
     * @param {CollectionPoint} data - Dados para atualizar no ponto de coleta.
     * @throws {CollectionPointNotFound} Se o ponto de coleta não for encontrado.
     * @throws {RequiredCollectionPointIdError} Se o id do ponto de coleta não for fornecido.
     * @throws {RequiredDataError} se dados não forem fornecidos no corpo da requisição (body).
     */
    public static async updateCollectionPoint(id: string, data: UpdateCollectionPoint){
        if(!id){
            throw new RequiredCollectionPointIdError();
        }
        
        const isDataEmpty = !data || Object.entries(data).length === 0;
        
        if(isDataEmpty){
            throw new RequiredDataError();
        }
       
        const collectionPoint = await knex("Collection_Point").where({ id: id }).first();
        
        if(!collectionPoint){
            throw new CollectionPointNotFound();
        }

        await knex("Collection_Point").where({ id: id }).update(data);

        return `Ponto de Coleta ${collectionPoint.name} atualizado com sucesso.`;
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

    public static async collectionPointNotification(id: string, nextCollectionDate: Date) {
        
        if (scheduledTasks[id]) {
            scheduledTasks[id].cancel();
        }
        
        const date = await DateFormat.validateDate(nextCollectionDate);
        date.setDate(date.getDate() - 2);
        
        const job = schedule.scheduleJob(date, () => {
            console.log(`Tarefa ${id} executada na data ${date}`);
            delete scheduledTasks[id];
        })

        scheduledTasks[id] = job;
    }

    public static async checkColectionPointNotification() {
        const collectionPoints = await knex("Collection_Point").select("id", "nextCollectionDate");

        collectionPoints.forEach(collectionPoint => {
            this.collectionPointNotification(collectionPoint.id, collectionPoint.nextCollectionDate);
        })
    }
}