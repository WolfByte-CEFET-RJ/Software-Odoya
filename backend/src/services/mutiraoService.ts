import DatabaseConnection from '../database/connection/DatabaseConnection';
const knex = DatabaseConnection.getInstance();
import Mutirao from '../types/mutirao';
import { DepositStatus } from '../types/mutirao';
import { v4 } from "uuid";


import mutiraoValidator from '../utils/Yup/mutiraoValidator';
import { CollectionPointNotFound } from '../erros/CollectionPointErros';
import { MutiraoNotFoundError, UnauthorizedDepositAccessError } from '../erros/MutiraoErrors';
export default class MutiraoService{

    /**
     * Obtém depósitos de um usuário comum ou todos os depósitos para admin
     * @param userId ID do usuário
     * @param isAdmin Indica se o usuário é administrador
     */
    public static async getAllMutiroes(userId: string, isAdmin: boolean): Promise<Mutirao[]> {
        let query = knex('Mutirao')
            .select('id', 'collectionPointId', 'userId', 'nome', 'local', 'data', 'horário', 'ponto de encontro', 'duração');

        if (!isAdmin) {
            query = query.where({ userId });
        }

        const mutiroes = await query;

        if (!mutiroes || mutiroes.length === 0) {
            return [];
        }

        return mutiroes;
    }

    /**
     * Obtém um depósito específico
     * @param id ID do depósito
     * @param userId ID do usuário solicitante
     * @param isAdmin Indica se o usuário é administrador
     */
    public static async getOneDeposit(id: string, userId: string, isAdmin: boolean): Promise<Mutirao> {
        const mutirao = await knex('Mutirao')
            .select('id', 'collectionPointId', 'userId', 'amountSponges', 'imageURL', 'status', 'created_at', 'updated_at')
            .where({ id })
            .first();

        if (!mutirao) {
            throw new MutiraoNotFoundError();
        }

        // Verifica se o usuário tem permissão para acessar o depósito
        if (!isAdmin && deposit.userId !== userId) {
            throw new UnauthorizedDepositAccessError();
        }

        return mutirao;
    }
    
    /**
     * @description Busca um Deposito
     * @param {string} id
     * @returns {Promise<Mutirao>}
     */
    public static async getDeposit(id: string): Promise<Mutirao> {
    
            const mutirao: Mutirao = await knex('Mutirao').select('id', 'collectionPointId', 'userId', 'amountSponges', 'imageURL', 'status', 'createdAt', 'updatedAt').where({id}).first();
            if (!mutirao) {
                throw new Error("Mutirao não encontrado");
            }
            return mutirao;
        }

    /**
     * @description Cria um Mutirao
     * @param {string} collectionPointId
     * @param {string} userId
     * @param {number} amountSponges
     * @param {string | NULL} imageURL
     * @returns {Promise<string>}
     */
    public static async createMutirao(collectionPointId: string, userId: string, amountSponges: number, imageURL: string): Promise<string>{
        await depositValidator.validateCreateMutirao({amountSponges,imageURL});
        const existCollectionPoint = await knex("collection_point").where({ id: collectionPointId }).first();
        
        if (!existCollectionPoint) {
            throw new CollectionPointNotFound();
        }
        
        try{
            var today = new Date;
        const mutirao: Mutirao = {
            id: v4(),
            collectionPointId,
            userId,
            amountSponges,
            imageURL,
            status: DepositStatus.PENDENTE,
            created_at: new Date(today.getFullYear(), today.getMonth(), today.getDate() ) ,               
            updated_at: new Date(today.getFullYear(), today.getMonth(), today.getDate() ) ,
        }

        await knex('Mutirao').insert(mutirao);
        return "Mutirao realizado";
        } catch (error){
            console.log("erro ao fazer o mutirao \ndetalhamento do erro:" + error);
            return("Erro ao fazer o mutirao " + error);
        }
    }


}