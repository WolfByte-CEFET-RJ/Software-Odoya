import { v4 } from "uuid";
import DatabaseConnection from "../database/connection/DatabaseConnection";
import CollectionPoint, { UpdateCollectionPoint } from "../types/collectionPoint";
import { CollectionPointNotFound, CollectionPointWithDepositsError, RequiredCollectionPointIdError, RequiredDataError, RequiredFieldsError } from "../erros/CollectionPointErros";
import { RequiredIdError } from "../erros/UserErros";
import DateFormat from "../utils/dateFormat";
import schedule from 'node-schedule';
import Mailer from "./Mailer";
import CollectionPointValidator from "../utils/Yup/collectionPointValidator";
const knex = DatabaseConnection.getInstance();
const mailer = new Mailer();
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

        await CollectionPointValidator.validateCreate({name, location, amountSponges, capacitySponges, lastCollectionDate, nextCollectionDate, isInactive });
        
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
        
        await this.collectionPointNotification(id, nextCollectionDate, name);

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
        
        await CollectionPointValidator.validateUpdate(data)

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

        if (data.nextCollectionDate) {
            const date = new Date(data.nextCollectionDate);
            const name = data.name || collectionPoint.name;

            if (date.getTime() != collectionPoint.nextCollectionDate.getTime()) {
                await this.collectionPointNotification(id, date, name);
            }
        }

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

        scheduledTasks[id]?.cancel();
        delete scheduledTasks[id];

        return true;
    }

    public static async notifyAdminsAboutNextCollection(id: string, nextCollectionDate: Date, name: string) {
        const users = await knex("User").where({admin: true}).select("email");
        const emailList = users.map(user => user.email);
        const usersEmails = emailList.join(", ");
        const { dateNotify, horaryNotify } = await DateFormat.convertLocaleDate(nextCollectionDate);

        const text = `${name}, ${dateNotify}, ${horaryNotify}`;

        mailer.sendMail(usersEmails, name, text);
        delete scheduledTasks[id];
    }

    public static async collectionPointNotification(id: string, nextCollectionDate: Date, name: string) {
    
        if (scheduledTasks[id]) {
            scheduledTasks[id].cancel();
        }
        
        if (!nextCollectionDate) {
            return;
        }
 
        const date = await DateFormat.validateDate(nextCollectionDate);
        date.setDate(date.getDate() - 2);
        
        if (date < new Date()) {
            return "Data inválida";
        }

        
        const job = schedule.scheduleJob(date, async () => {
            await this.notifyAdminsAboutNextCollection(id, nextCollectionDate, name);
        })

        scheduledTasks[id] = job;
        console.log(scheduledTasks);
    }

    public static async checkColectionPointNotification() {
        const collectionPoints = await knex("Collection_Point").select("id", "nextCollectionDate", "name");

        collectionPoints.forEach(async collectionPoint => {
            if (scheduledTasks[collectionPoint.id]) {
                scheduledTasks[collectionPoint.id].cancel();
            }

            const date = await DateFormat.validateDate(collectionPoint.nextCollectionDate);
            date.setDate(date.getDate() - 2);

            const job = schedule.scheduleJob(date, async () => {
                await this.notifyAdminsAboutNextCollection(collectionPoint.id, collectionPoint.nextCollectionDate, collectionPoint.name);
            })
    
            scheduledTasks[collectionPoint.id] = job;
            
        })

        console.log(scheduledTasks);
        return scheduledTasks;
    }
}