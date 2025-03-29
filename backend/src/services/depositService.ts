import DatabaseConnection from '../database/connection/DatabaseConnection';
const knex = DatabaseConnection.getInstance();
import Deposit from '../types/deposit';
import { DepositStatus } from '../types/deposit';
import { v4 } from "uuid";

export default class DepositService{
    //pega todos os dados de um deposit dado seu id
    public static async getDeposit(id: string): Promise<Deposit> {
    
            const deposit: Deposit = await knex('Deposit').select('id', 'collectionPointId', 'userId', 'amountSponges', 'imageURL', 'status', 'createdAt', 'updatedAt').where({id}).first();
            if (!deposit) {
                throw new Error("Deposito não encontrado");
            }
            return deposit;
        }
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

    public static async deleteDeposit(id: string){
        try{
            await knex("Deposit").where({id: id}).delete();
        } catch (error){
            console.log("erro ao deletar o status do deposito \ndetalhamento do erro:" + error);
        }
    }


}