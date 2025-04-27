import DatabaseConnection from '../database/connection/DatabaseConnection';
const knex = DatabaseConnection.getInstance();
import Deposit from '../types/deposit';
import { DepositStatus } from '../types/deposit';
import { v4 } from "uuid";


import depositValidator from '../utils/Yup/depositValidator';
import { CollectionPointNotFound } from '../erros/CollectionPointErros';
import { DepositNotFoundError, UnauthorizedDepositAccessError } from '../erros/DepositErrors';
export default class DepositService{

     /**
     * Obtém depósitos de um usuário comum ou todos os depósitos para admin
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
     * Obtém um depósito específico
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
    
            const deposit: Deposit = await knex('Deposit').select('id', 'collectionPointId', 'userId', 'amountSponges', 'imageURL', 'status', 'createdAt', 'updatedAt').where({id}).first();
            if (!deposit) {
                throw new Error("Deposito não encontrado");
            }
            return deposit;
        }

    /**
     * @description Cria um Usuário
     * @param {string} collectionPointId
     * @param {string} userId
     * @param {number} amountSponges
     * @param {string | NULL} imageURL
     * @returns {Promise<string>}
     */
    public static async createDeposit(collectionPointId: string, userId: string, amountSponges: number, imageURL: string): Promise<string>{
        await depositValidator.validateCreateDeposit({amountSponges,imageURL});
        const existCollectionPoint = await knex("collection_point").where({ id: collectionPointId }).first();
        
        if (!existCollectionPoint) {
            throw new CollectionPointNotFound();
        }
        
        const awaitTransactions = await knex.transaction();
        
        try{
            var today = new Date;
        const deposit: Deposit = {
            id: v4(),
            collectionPointId,
            userId,
            amountSponges,
            imageURL,
            status: DepositStatus.PENDENTE,
            created_at: new Date(today.getFullYear(), today.getMonth(), today.getDay() ) ,               
            updated_at: new Date(today.getFullYear(), today.getMonth(), today.getDay() ) ,
        }

        await awaitTransactions('Deposit').insert(deposit);
        await awaitTransactions('collection_point').where({id: collectionPointId}).increment('amountSponges', amountSponges);
        await awaitTransactions.commit();
        return "Deposito realizado";
        } catch (error){
            await awaitTransactions.rollback();
            console.log("erro ao fazer o deposito \ndetalhamento do erro:" + error);
            return("Erro ao fazer o deposito " + error);
        }
    }
    //atualiza somente o status de um deposito dado a sua ID
    public static async updateDepositStatus(id: string, status: string){
        try{
        const deposit: Partial<Deposit> = {
            status:  status == "APROVADO" ? DepositStatus.APROVADO : DepositStatus.REPROVADO ,
        }
        await knex('Deposit').where({ id }).update(deposit);
        return "Status de Deposito atualizado";
        } catch (error){
            console.log("erro ao atualizar o status do deposito \ndetalhamento do erro:" + error);
        }
    }



}