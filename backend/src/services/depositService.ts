import DatabaseConnection from '../database/connection/DatabaseConnection';
const knex = DatabaseConnection.getInstance();
import Deposit from '../types/deposit';
import { DepositStatus } from '../types/deposit';
import { v4 } from "uuid";
import { CollectionPointNotFound } from "../erros/depositErrors";
import depositValidator from '../utils/Yup/depositValidator';
import { Knex } from 'knex';
export default class DepositService{
    
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
        
        try{
            var today = new Date;
        const deposit: Deposit = {
            id: v4(),
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
        } catch (error){
            console.log("erro ao fazer o deposito \ndetalhamento do erro:" + error);
            return("Erro ao fazer o deposito " + error);
        }
    }

    //atualiza somente o status de um deposito dado a sua ID
    public static async updateDepositStatus(id: string, status: string){
        await depositValidator.validateUpdateDepositStatus({status});

        try{

        const depositData = await knex("Deposit").where({ id }).select("amountSponges", "collectionPointId","status").first();

        if (!depositData) {
            throw new Error("valor do Depósito não encontrado.");
        }

        // Verifica se o status no banco é o que o status enviado 
        if (depositData.status === status) {
            return ("O depósito já se encontra no estado de " + status);
        }

         // Verificar se o status já estava previamente aprovado, se sim, ele decrementa da tabela collectionPoint as esponjas que foram adicionadas
            if (depositData.status === DepositStatus.APROVADO) {
                await knex('collection_point').where({id: depositData.collectionPointId}).decrement('amountSponges', depositData.amountSponges);  
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
                await awaitTransactions('collection_point').where({id: deposit.collectionPointId}).increment('amountSponges', deposit.amountSponges);
                await awaitTransactions.commit();
            return "Status de Deposito atualizado. Deposito " + deposit.status + "!";
                } catch (error){
                    console.log("erro ao atualizar o status dentro do banco \ndetalhamento do erro:" + error);
                    await awaitTransactions.rollback();
                }
                
        }else{
            await knex('Deposit').where({ id }).update(deposit);
            return "Status de Deposito atualizado. Deposito " + deposit.status  + "!";
        }
        
        } catch (error){
            console.log("erro ao atualizar o status do deposito \ndetalhamento do erro:" + error);
            
        }
    }



}