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
     * Obtém um mutirao específico
     * @param id ID do mutirao
     * @param userId ID do usuário solicitante
     * @param isAdmin Indica se o usuário é administrador
     */
    public static async getOneMutirao(id: string, userId: string, isAdmin: boolean): Promise<Mutirao> {
        const mutirao = await knex('Mutirao')
            .select('userId',
            'name',
            'location',
            'data',
            'horario',
            'pontoEncontro',
            'duracao')
            .where({ id })
            .first();

        if (!mutirao) {
            throw new MutiraoNotFoundError();
        }

        // Verifica se o usuário tem permissão para acessar o mutirao
        if (!isAdmin && mutirao.userId !== userId) {
            throw new UnauthorizedMutiraoAccessError();
        }

        return mutirao;
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

    /**
     * @description Cria um Mutirao
     * @param {string} collectionPointId
     * @param {string} userId
     * @param {number} amountSponges
     * @param {string | NULL} imageURL
     * @returns {Promise<string>}
     */
    public static async createMutirao(  id: string,
    userId: string,
    name: string,
    location: string,
    data: Date,
    horario: number,
    pontoEncontro: string,
    duracao: number): Promise<string>{

        /*
        await mutiraoValidator.validateCreateMutirao({amountSponges,imageURL});
        const existCollectionPoint = await knex("collection_point").where({ id: collectionPointId }).first();
        
        if (!existCollectionPoint) {
            throw new CollectionPointNotFound();
        }
        */
        try{
        const mutirao: Mutirao = {
            id: v4(),
            userId,
            name,
            location,
            data,
            horario,
            pontoEncontro,
            duracao,
        }

        await knex('Mutirao').insert(mutirao);
        return "Mutirao criado";
        } catch (error){
            console.log("erro ao criar o mutirao \ndetalhamento do erro:" + error);
            return("Erro ao fazer o mutirao " + error);
        }
    }


}