import DatabaseConnection from '../database/connection/DatabaseConnection';
const knex = DatabaseConnection.getInstance();
import Deposit from '../types/deposit';
import { DepositStatus } from '../types/deposit';
import { v4 } from "uuid";
import { DepositNotFoundError, UnauthorizedDepositAccessError } from "../erros/DepositErrors";

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
    public static async getDeposit(id: string, userId: string, isAdmin: boolean): Promise<Deposit> {
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
    
    //pega todos os dados de um deposit dado seu id
    // public static async getDeposit(id: string): Promise<Deposit> {
    
    //         const deposit = await knex('Deposit').select('id', 'collectionPointId', 'userId', 'amountSponges', 'imageURL', 'status', 'createdAt', 'updatedAt').where({id}).first();
    //         if (!deposit) {
    //             throw new Error("Deposito não encontrado");
    //         }
    //         return deposit;
    //     }
    //cria um deposit dado as colunas não nulas
    public static async createDeposit(collectionPointId: string, userId: string, amountSponges: number, imageURL: string){
        try{
            var today = new Date;
        const deposit: Deposit = {
            id: v4(),
            collectionPointId,
            userId,
            amountSponges,
            imageURL,
            status: DepositStatus.PENDENTE,
            createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDay() ) ,               
            updatedAt: new Date(today.getFullYear(), today.getMonth(), today.getDay() ) ,
        }
        await knex('Deposit').insert(deposit);
        return "Deposito realizado";
        } catch (error){
            console.log("erro ao fazer o deposito \ndetalhamento do erro:" + error);
        }
    }
    //atualização padrão do deposit
    public static async updateDeposit(id: string, collectionPointId: string, userId: string, amountSponges: number, imageURL: string){
        try{
            var today = new Date;
        const deposit: Partial<Deposit> = {
            id: id,
            collectionPointId,
            userId,
            amountSponges,
            imageURL,
            status: DepositStatus.PENDENTE,
            updatedAt: new Date(today.getFullYear(), today.getMonth(), today.getDay() ) ,
        }
        await knex('Deposit').where({ id }).update(deposit);
        return "Deposito atualizado";
        } catch (error){
            console.log("erro ao atualizar o deposito \ndetalhamento do erro:" + error);
        }
    }
    //atualiza somente o status de um deposito dado a sua ID
    public static async updateDepositStatus(id: string, status: DepositStatus){
        try{
        const deposit: Partial<Deposit> = {
            status
        }
        await knex('Deposit').where({ id }).update(deposit);
        return "Status de Deposito atualizado";
        } catch (error){
            console.log("erro ao atualizar o status do deposito \ndetalhamento do erro:" + error);
        }
    }
    public static async deleteDeposit(id: string){
        try{
            await knex("Deposit").where({id: id}).delete();
        } catch (error){
            console.log("erro ao deletar o status do deposito \ndetalhamento do erro:" + error);
        }
    }


}