import DatabaseConnection from '../database/connection/DatabaseConnection';
import Deposit from '../types/deposit';
import { DepositStatus } from '../types/deposit';
import depositValidator from '../utils/Yup/depositValidator';
import { CollectionPointNotFound } from '../erros/CollectionPointErros';
import { DepositNotAllowed, DepositNotFoundError, UnauthorizedDepositAccessError } from '../erros/DepositErrors';
import CollectionPointService from './collectionPointService';
import Mailer from './Mailer';

const knex = DatabaseConnection.getInstance();

/**
 * @class DepositService
 * @description Serviço para Depósitos.
 */
export default class DepositService{

    /**
     * @description Obtém os depósitos em um ponto de coleta
     * @param userId ID do ponto de coleta
     * @param page Página buscada
     * @param limit Tamanho da página
    */
    public static async getAllDeposits(page: number, limit: number, id: string): Promise<(Deposit & {total : number})[]> {
        const offset = (page - 1) * limit;

        console.log(id, page, limit)
        const  deposits = await knex('Deposit')
            .join("Collection_Point", "Deposit.collectionPointId", "Collection_Point.id")
            .join("User", "Deposit.userId", "User.id")
            .select('Deposit.id', 'collectionPointId', 'Collection_Point.name as point_name' ,'userId', 'User.name as name' , 
            'Deposit.amountSponges', 'imageURL', 'status', 'created_at', 'updated_at', knex.raw('COUNT(User.name) OVER() as total'))
            .where('collectionPointId', id)
            .orderBy([{ column: 'Deposit.created_at', order: 'desc' }, { column: 'Deposit.id', order: 'asc' }])
            .limit(limit)
            .offset(offset);

        console.log(deposits)

        if (!deposits || deposits.length === 0) {
            throw new DepositNotFoundError();
        }

        return deposits;
    }

    public static async getSearchDeposit(page: number, limit: number, id: string, name:string): Promise<(Deposit & {total : number})[]> {
        const offset = (page - 1) * limit;
        
        const deposits = await knex('Deposit')
                .join("Collection_Point", "Deposit.collectionPointId", "Collection_Point.id")
                .join("User", "Deposit.userId", "User.id")
                .select('Deposit.id', 'collectionPointId', 'Collection_Point.name as point_name', 'userId', 'User.name as name', 
                        'Deposit.amountSponges', 'imageURL', 'status', 'created_at', 'updated_at', knex.raw('COUNT(User.name) OVER() as total'))
                .where('collectionPointId', id)
                .andWhere('User.name', 'like', `%${name}%`)
                .orderBy([{ column: 'Deposit.created_at', order: 'desc' }, { column: 'Deposit.id', order: 'asc' }])
                .limit(limit)
                .offset(offset);

        if (!deposits || deposits.length === 0) {
            return []
        }

        return deposits;
    }

    /**
     * @description Obtém um depósito específico
     * @param id ID do depósito
     * @param userId ID do usuário solicitante
     * @param isAdmin Indica se o usuário é administrador
     */
    public static async getOneDeposit(id: string, userId: string, isAdmin: boolean): Promise<Deposit> {
        const deposit = await knex('Deposit')
            .select('id', 'collectionPointId', 'userId', 'amountSponges', 'imageURL', 'status', 'created_at', 'updated_at')
            .where({ id })
            .first();

        if (!deposit) {
            throw new DepositNotFoundError();
        }

        // Verifica se o usuário tem permissão para acessar o depósito
        if (!isAdmin && deposit.userId !== userId) {
            throw new UnauthorizedDepositAccessError();
        }

        return deposit;
    }
    
    /**
     * @description Busca um Deposito
     * @param {string} id
     * @returns {< any []>}
     */
    public static async getDeposit(page: number, limit: number,id: string,): Promise<any[]> {  
        const offset = (page - 1) * limit;
        const deposit = await knex('Deposit')
            .join("Collection_Point as cp", "Deposit.collectionPointId", "cp.id")
            .select('Deposit.id', 'collectionPointId', 'cp.name as point_name' , 'Deposit.amountSponges', 'Deposit.imageURL', 'Deposit.status', 'Deposit.created_at', 'Deposit.updated_at' , knex.raw('COUNT(Deposit.id) OVER() as total'))
            .orderBy([{ column: 'Deposit.created_at', order: 'desc' }, { column: 'cp.name', order: 'asc' }])
            .where('Deposit.userId', id)
            .limit(limit)
            .offset(offset);

        if (deposit.length === 0) {
            throw new DepositNotFoundError()
        }
        
        return deposit;
    }

    /**
     * @description Busca a frequência de depósitos em cada ponto de coleta
     * @returns {Promise<{ collectionPointId: string, point_name: string, totalDeposits: number }[]>}
     */
    public static async getDepositFrequency(): Promise<{ collectionPointId: string, point_name: string, totalDeposits: number }[]> {
    const result: any[] = await knex('Deposit')
        .join("Collection_Point as cp", "Deposit.collectionPointId", "cp.id")
        .select("Deposit.collectionPointId", "cp.name as point_name")
        .count("Deposit.id as totalDeposits")
        .groupBy("Deposit.collectionPointId", "cp.name");

    return result.map(r => ({
        collectionPointId: String(r.collectionPointId),
        point_name: String(r.point_name),
        totalDeposits: Number(r.totalDeposits)
    }));
    }

    /**
     * @description Cria um depósito
     * @param {string} collectionPointId
     * @param {string} userId
     * @param {number} amountSponges
     * @param {string | NULL} imageURL
     * @returns {Promise<string>}
     */
    public static async createDeposit(depositId: string, collectionPointId: string, userId: string, amountSponges: number, imageURL: string | undefined): Promise<string>{
        
        await depositValidator.validateCreateDeposit({amountSponges});
        
        const collectionPoint = await CollectionPointService.getOneCollectionPoint(collectionPointId)
        
        if (!collectionPoint) {
            throw new CollectionPointNotFound();
        }
        
        if(collectionPoint.isInactive){
            throw new DepositNotAllowed("Receptor inativo")
        }

        if(amountSponges > collectionPoint.capacitySponges){
            throw new DepositNotAllowed("Quatidade de esponjas maior que a permitida")
        }

        const sumPendentes = await knex("Deposit")
            .where({collectionPointId})
            .andWhere({status: DepositStatus.PENDENTE})
            .sum("amountSponges as total")

        const possibleAmount = collectionPoint.amountSponges + (Number(sumPendentes[0].total) || 0)

        if (possibleAmount + amountSponges > collectionPoint.capacitySponges){
            // Enviar email pros administradores avisando que alguem tentou registrar o deposito mas nn conseguiu
            //const mail = new Mailer()
            //mail.sendMail()
            throw new DepositNotAllowed(
                `Limite excedido. Tente novamente após a coleta. Espaço disponível: ${collectionPoint.capacitySponges - possibleAmount}`);
        }
        

        var today = new Date;
        const deposit: Partial<Deposit> = {
            id: depositId,
            collectionPointId,
            userId,
            amountSponges,
            imageURL,
            status: DepositStatus.PENDENTE
        }

        await knex('Deposit').insert(deposit);

        if (amountSponges+collectionPoint.amountSponges === collectionPoint.capacitySponges){
            // Enviar email pros administradores avisando que encheu
            //const mail = new Mailer()
            //mail.sendMail()
        }    

        return "Deposito realizado";
    }

    /**
     * @description Atualiza o status de um depósito
     * @param {string} id
     * @param {string} status
     */
    public static async updateDepositStatus(id: string, status: string): Promise<String | undefined>{
        
        await depositValidator.validateUpdateDepositStatus({status});

        try {

            const depositData = await knex("Deposit").where({ id }).select("amountSponges", "collectionPointId","status","userId","imageURL").first();

            if (!depositData) {
                throw new DepositNotFoundError()
            }

            // Verifica se o status no banco é o que o status enviado 
            if (depositData.status === status) {
                return ("O depósito já se encontra no estado de " + status);
            }

            // Verificar se o status já estava previamente aprovado, se sim, ele decrementa da tabela collectionPoint as esponjas que foram adicionadas e os pontos do usuario
            if (depositData.status === DepositStatus.APROVADO) {
                const user_points =  depositData.imageURL ? 2 * depositData.amountSponges! : depositData.amountSponges;

                await knex('User').where({id: depositData.userId}).decrement('points', user_points);
                await knex('Collection_Point').where({id: depositData.collectionPointId}).decrement('amountSponges', depositData.amountSponges);    
            }

            const deposit: Partial<Deposit> = { 
                status:  status as DepositStatus ,
                amountSponges:  depositData.amountSponges,
                collectionPointId: depositData.collectionPointId
            }

            if(status == DepositStatus.APROVADO){
                const awaitTransactions = await knex.transaction();
                const user_points =  depositData.imageURL ? 2 * deposit.amountSponges! : deposit.amountSponges;

                try {
                    await awaitTransactions('User').where({id: depositData.userId}).increment('points', user_points);
                    await awaitTransactions('Deposit').where({ id }).update(deposit);
                    await awaitTransactions('Collection_Point').where({id: deposit.collectionPointId}).increment('amountSponges', deposit.amountSponges);
                    await awaitTransactions.commit();
            
                    return "Status de Deposito atualizado. Deposito " + deposit.status + "!";

                } catch (error){
                    await awaitTransactions.rollback();
                    throw new Error("Erro ao atualizar o status dentro do banco" + error);
                }
                    
            } else{
                await knex('Deposit').where({ id }).update(deposit);
                return "Status de Deposito atualizado. Deposito " + deposit.status  + "!";
            }
            
        } catch (error){
            throw new Error("Erro ao atualizar o status do deposito: "+ error);
        }
    }
}