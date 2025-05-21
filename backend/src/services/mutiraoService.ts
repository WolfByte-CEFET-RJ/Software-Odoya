import DatabaseConnection from '../database/connection/DatabaseConnection';
const knex = DatabaseConnection.getInstance();
import Mutirao from '../types/mutirao';
import { v4 } from "uuid";
//import mutiraoValidator from '../utils/Yup/mutiraoValidator';
//import { CollectionPointNotFound } from '../erros/CollectionPointErros';
import { MutiraoNotFoundError, UnauthorizedMutiraoAccessError } from '../erros/MutiraoError';

export default class MutiraoService{

    /**
     * Obtém mutiroes de um usuário comum ou todos os mutiroes para admin
     * @param userId ID do usuário
     * @param isAdmin Indica se o usuário é administrador
     */
    public static async getAllMutiroesScheduled(): Promise<Mutirao[]> {
        
        const today = new Date();
        try {
            const mutiroes = await knex('event').select( 'name', 'location', 'date', 'meetingpoint', 'estimatedDuration').where("date", ">", today)
            if (!mutiroes ||  mutiroes.length === 0) {
            return  [];
        }
        return mutiroes;
        } catch (error: any) {
            throw new Error(String(error.message));
        }
    }

    public static async getAllMutiroes(): Promise<Mutirao[]> {
        const mutiroes = await knex('event').select( 'name', 'location', 'date', 'meetingpoint', 'estimatedDuration');
        
        if (!mutiroes ||  mutiroes.length === 0) {
            return  [];
        }

        return mutiroes;
    }

    /**
     * Obtém um mutirao específico
     * @param id ID do mutirao
     */
    public static async getOneMutirao(id: string): Promise<Mutirao> {
        try {
            const mutirao = await knex('event')
            .select(
            'name',
            'location',
            'date',
            'meetingpoint',
            'estimatedDuration',)
            .where({ id })
            .first();

            if (!mutirao) {
                console.log(mutirao)
                throw new Error("Mutirao não encontrado");
            }
            return mutirao;
        } catch (error: any) {
            console.log(error)
            throw new MutiraoNotFoundError();
        }
        
    }
    
    /**
     * @description Busca um Mutirao
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
    
    


}