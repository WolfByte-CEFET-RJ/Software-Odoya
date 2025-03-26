import DatabaseConnection from '../database/connection/DatabaseConnection';
const knex = DatabaseConnection.getInstance();
import Deposit from '../types/deposit';

export default class DepositService{
    public static async getDeposit(id: string): Promise<Deposit> {
    
            const deposit = await knex('Deposit').select('id', 'collectionPointId', 'userId', 'amountSponges', 'imageURL', 'status', 'createdAt', 'updatedAt').where({id}).first();
            if (!deposit) {
                throw new Error("Deposito não encontrado");
            }
            return deposit;
        }


}