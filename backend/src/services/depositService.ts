import DatabaseConnection from '../database/connection/DatabaseConnection';
import Deposit from '../types/deposit';
import { DepositStatus } from '../types/deposit';
import depositValidator from '../utils/Yup/depositValidator';
import { CollectionPointNotFound } from '../erros/CollectionPointErros';
import { DepositNotFoundError, UnauthorizedDepositAccessError } from '../erros/DepositErrors';

const knex = DatabaseConnection.getInstance();

/**
 * @class DepositService
 * @description Serviço para Depósitos.
 */
export default class DepositService{

    /**
     * @description Obtém depósitos de um usuário comum ou todos os depósitos para admin
     * @param userId ID do usuário
     * @param isAdmin Indica se o usuário é administrador
     */
    public static async getAllDeposits(userId: string, isAdmin: boolean): Promise<Deposit[]> {
        let query = knex('Deposit')
            .select('id', 'collectionPointId', 'userId', 'amountSponges', 'imageURL', 'status', 'created_at', 'updated_at');

        if (!isAdmin) {
            query = query.where({ userId });
        }

        const deposits = await query;

        if (!deposits || deposits.length === 0) {
            return [];
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
     * @returns {Promise<Deposit>}
     */
    public static async getDeposit(id: string): Promise<Deposit> {    
        const deposit: Deposit = await knex('Deposit')
            .select('id', 'collectionPointId', 'userId', 'amountSponges', 'imageURL', 'status', 'created_at', 'updated_at').where({id}).first();
        
        if (!deposit) {
            throw new DepositNotFoundError()
        }
        return deposit;
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
        const existCollectionPoint = await knex("Collection_Point").where({ id: collectionPointId }).first();
        
        if (!existCollectionPoint) {
            throw new CollectionPointNotFound();
        }
        

        var today = new Date;
        const deposit: Deposit = {
            id: depositId,
            collectionPointId,
            userId,
            amountSponges,
            imageURL,
            status: DepositStatus.PENDENTE,
            created_at: new Date(today.getFullYear(), today.getMonth(), today.getDate() ) ,               
            updated_at: new Date(today.getFullYear(), today.getMonth(), today.getDate() ) ,
        }

        await knex('Deposit').insert(deposit);
        return "Deposito realizado";
    }

    /**
     * @description Atualiza o status de um depósito
     * @param {string} id
     * @param {string} status
     */
    public static async updateDepositStatus(id: string, status: string): Promise<String | undefined>{
        await depositValidator.validateUpdateDepositStatus({status});

        const depositData = await knex("Deposit").where({ id }).select("amountSponges", "collectionPointId","status").first();

        if (!depositData) {
            throw new DepositNotFoundError()
        }

        // Verifica se o status no banco é o que o status enviado 
        if (depositData.status === status) {
            return ("O depósito já se encontra no estado de " + status);
        }

         // Verificar se o status já estava previamente aprovado, se sim, ele decrementa da tabela collectionPoint as esponjas que foram adicionadas
        if (depositData.status === DepositStatus.APROVADO) {
            await knex('Collection_Point').where({id: depositData.collectionPointId}).decrement('amountSponges', depositData.amountSponges);  
        }

        const deposit: Partial<Deposit> = {
            status:  status as DepositStatus ,
            amountSponges:  depositData.amountSponges,
            collectionPointId: depositData.collectionPointId
        }

        if(status == DepositStatus.APROVADO){
            const awaitTransactions = await knex.transaction();
            try{
                await awaitTransactions('Deposit').where({ id }).update(deposit);
                await awaitTransactions('Collection_Point').where({id: deposit.collectionPointId}).increment('amountSponges', deposit.amountSponges);
                await awaitTransactions.commit();
                return "Status de Deposito atualizado. Deposito " + deposit.status + "!";
            } catch (error){        
                await awaitTransactions.rollback();
                throw error;
            }
                
        }else{
            await knex('Deposit').where({ id }).update(deposit);
            return "Status de Deposito atualizado. Deposito " + deposit.status  + "!";
        }
    }
}