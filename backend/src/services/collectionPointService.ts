import { v4 } from "uuid";
import DatabaseConnection from "../database/connection/DatabaseConnection";
import CollectionPoint, { UpdateCollectionPoint } from "../types/collectionPoint";
import { CollectionPointNotFound, CollectionPointWithDepositsError} from "../erros/CollectionPointErros";
import DateFormat from "../utils/dateFormat";
import schedule from 'node-schedule';
import Mailer from "./Mailer";
import CollectionPointValidator from "../utils/Yup/collectionPointValidator";
import { MissinngDataError } from "../erros/CommonErros";
import { DepositNotAllowed } from "../erros/DepositErrors";

const knex = DatabaseConnection.getInstance();
const mailer = new Mailer();
let scheduledTasks: Record<string, schedule.Job> = {};

/**
 * @class CollectionPointService
 * @description Serviço para Pontos de Coleta.
 */
export default class CollectionPointService {

    /**
     * @description Busca todos os pontos de coleta cadastrados
     * @returns {Promise<CollectionPoint[]>} Pontos de coleta existentes
     */
    public static async getAllCollectionPoint(): Promise<CollectionPoint[]> {
        const collectionPoints: CollectionPoint[] = await knex("Collection_Point").select("*");
        return collectionPoints;
    }
    
    /**
     * @description Busca um ponto de coleta
     * @param {string} id Identificador do ponto de coleta
     * @returns {Promise<CollectionPoint>} Pontos de coleta buscado
     */
    public static async getOneCollectionPoint(id: string): Promise<CollectionPoint> {

        const collectionPoint: CollectionPoint = await knex("Collection_Point").select("*").where({id}).first();

        if(!collectionPoint) {
            throw new CollectionPointNotFound();
        }

        return collectionPoint;
    }
    
    /**
     * @description Fornece o total de esponjas coletadas
     * @returns {Promise<number>} Total de esponjas
     */
    public static async getTotalSpongesInPoints(): Promise<number> {

        const [{ totalSponges }] = await knex("Collection_Point")
            .sum("amountSponges as totalSponges");

        return Number(totalSponges)
    }

    /**
     * @description Cria um ponto de coleta
     * @param {CollectionPoint} requestBody Informações do ponto de coleta
     * @returns {Promise<String>} Resposta de sucesso
     */
    public static async createCollectionPoint(requestBody: CollectionPoint): Promise<String> {
        const { name, location, capacitySponges, lastCollectionDate, nextCollectionDate, isInactive } = requestBody;

        await CollectionPointValidator.validateCreate({name, location, capacitySponges, lastCollectionDate, nextCollectionDate, isInactive });
        
        const id = v4();
        await knex("Collection_Point").insert({
            id,
            name,
            location,
            capacitySponges,
            lastCollectionDate,
            nextCollectionDate,
            isInactive
        })
        
        await this.collectionPointNotification(id, nextCollectionDate, name);

        return "Ponto de Coleta criado";
    }

    /**
     * @method updateCollectionPoint
     * @description Remove um ponto de coleta específico pelo ID, se não houver depósitos associados
     * @param {string} id - ID do ponto de coleta a ser removido.
     * @param {CollectionPoint} data - Dados para atualizar no ponto de coleta.
     * @returns {Promise<String>} Resposta de sucesso
     * @throws {CollectionPointNotFound} Se o ponto de coleta não for encontrado.
     * @throws {MissinngDataError} Se o id do ponto de coleta não for fornecido ou se dados não forem fornecidos no corpo da requisição (body).
     */
    public static async updateCollectionPoint(id: string, data: UpdateCollectionPoint): Promise<String>{
        
        await CollectionPointValidator.validateUpdate(data)

        if(!id){
            throw new MissinngDataError("Id do ponto de coleta não informado")
        }
        
        const isDataEmpty = !data || Object.entries(data).length === 0;
        
        if(isDataEmpty){
            throw new MissinngDataError("Dados para atualização não fornecidos")
        }
       
        const collectionPoint = await knex("Collection_Point").where({ id: id }).first();
        
        if(!collectionPoint){
            throw new CollectionPointNotFound();
        }

        if (data.amountSponges !== undefined && data.amountSponges > collectionPoint.amountSponges) {
            throw new DepositNotAllowed("Incrementos de esponjas devem ser feitos através de depósitos diretos")
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
     * @returns {Promise<Boolean>} Estado da transação
     * @throws {CollectionPointNotFound} Se o ponto de coleta não for encontrado
     * @throws {CollectionPointWithDepositsError} Se existirem depósitos associados ao ponto de coleta
     */
    public static async deleteCollectionPoint(id: string): Promise<Boolean> {
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

    /**
     * @description Envia notificação para administradores sobre ponto de coleta
     * @param {String} id Identificador do ponto de coleta
     * @param {Date} nextCollectionDate Data da coleta
     * @param {String} name Nome do ponto de coleta
     * @return {void}
     */
    public static async notifyAdminsAboutNextCollection(id: string, nextCollectionDate: Date, name: string): Promise<void> {
        const users = await knex("User").where({admin: true}).select("email");
        const emailList = users.map(user => user.email);
        const usersEmails = emailList.join(", ");
        const { dateNotify, horaryNotify } = await DateFormat.convertLocaleDate(nextCollectionDate);

        const text = `${name}, ${dateNotify}, ${horaryNotify}`;

        mailer.sendMail(usersEmails, name, text);
        delete scheduledTasks[id];
    }

    /**
     * @description Agenda uma notificação para administradores sobre o ponto de coleta.
     * @param {String} id Identificador do ponto de coleta
     * @param {Date} nextCollectionDate Data da próxima coleta
     * @param {String} name Nome do ponto de coleta
     * @returns {Promise<String | void>}
     */
    public static async collectionPointNotification(id: string, nextCollectionDate: Date, name: string): Promise<string | void> {
    
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

        console.log("⌛ \tAgendamentos de Ponto de Coleta: ");
        console.log(scheduledTasks)
    }

    /**
     * @description Verifica todos os pontos de coleta e agenda notificações para os administradores.
     *  Limpa os agendamentos anteriores e atualiza
     * @returns {Promise<Record<string, schedule.Job> >} Retorna o objeto contendo todas as tarefas agendadas
     */
    public static async checkColectionPointNotification(): Promise<Record<string, schedule.Job>> {
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

        console.log("⌛ \tAgendamentos de Ponto de Coleta: ");
        console.log(scheduledTasks)

        return scheduledTasks;
    }

    // Reports

    /**
     * @description Retorna o campo isFullDate e lastCollectionDate
     *  
     * @returns {Promise<Record<string, schedule.Job> >} Retorna o objeto contendo todas as tarefas agendadas
     */

    public static async reportGetFullDate(id: string): Promise<CollectionPoint> {

        const ReportData = await knex("Collection_Point").select("isFullDate,lastCollectionDate").where({id}).first();

        if(!ReportData) {
            throw new CollectionPointNotFound();
        }
        
        return ReportData;
    }

}