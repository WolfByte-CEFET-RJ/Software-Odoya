import 'dotenv/config';
import { v4 } from "uuid";
import { hash } from "bcryptjs";
import { EmailDuplicate, UserNotFound } from "../erros/UserErros";
import User, { UpdateUser } from "../types/user"
import UserValidator from '../utils/Yup/userValidator';
import Mailer from './Mailer';
import DatabaseConnection from '../database/connection/DatabaseConnection';
import { MissinngDataError } from '../erros/CommonErros';
import { RootUserModificationError } from '../erros/AuthErros';
const knex = DatabaseConnection.getInstance();
const mailer = new Mailer();

/**
 * @class UserService
 * @description Serviços para Usuário
 */
export default class UserService {
    /**
     * @description Busca um Usuário
     * @param {string} id
     * @returns {Promise<User>}
     */
    public static async getUser(id: string): Promise<User> {

        const user = await knex('User').select('id', 'name', 'email', 'admin', 'points').where({id}).first();
        if (!user) {
            throw new UserNotFound();
        }
        return user;
    }

    /**
     * @warning
     * @description Busca um Usuário por emaiil. Hash da senha incluso no objeto de resposta.
     * @param {string} email
     * @returns {Promise<User & { password: string }>}
     */
    public static async getUserSensitiveByEmail(email: string): Promise<User & { password: string }> {

        const user = await knex('User').select('id', 'name', 'email', 'admin', 'points', 'password').where({email}).first();
        if (!user) {
            throw new UserNotFound();
        }
        return user;
    }

    /**
     * @description Busca todos os usuários, com exceção do super-usuário
     * @returns {Promise<User[]>}
     */
    public static async getAll(): Promise<User[]>{
        const users: User[] = await knex("User").select('id', 'name', 'email', 'admin', 'points').whereNot({email: process.env.ROOT_EMAIL});
    
        if(users.length===0){
            throw new UserNotFound()
        }
        
        // Traduzindo campos booleanos
        users.forEach(user => {
            user.admin = Boolean(user.admin);
        });
    
        return users
    }

    /**
     * @description Retorna uma lista paginada de usuários, com exceção do super-usuário
     * @param {number} page
     * @param {number} limit
     * @returns {Promise<User[]>}
     */
    public static async getAllPagination(page: number, limit: number): Promise<User[]>{
        const offset = (page - 1) * limit;

        const users: User[] = await knex("User")
                                .select('id', 'name', 'email', 'admin', 'points')
                                .whereNot({email: process.env.ROOT_EMAIL})
                                .limit(limit)
                                .offset(offset);
    
        if(users.length===0){
            throw new UserNotFound()
        }
        
        // Traduzindo campos booleanos
        users.forEach(user => {
            user.admin = Boolean(user.admin);
        });
    
        return users
    }

    /**
     * @description Realiza a criação do Usuário
     * @param {string} name
     * @param {string} email
     * @param {string} password
     * @returns {Promise<string>}
     */
    public static async createUser(name: string, email: string, password: string): Promise<string> {
        await UserValidator.validateCreateUser({name,email,password});

        const existingUser = await knex("User").where({ email }).first();
        if (existingUser) {
            throw new EmailDuplicate();
        }

        const hashPassword = await hash(password, Number(process.env.SALT_ROUNDS));
        const user = {
            id: v4(),
            name,
            email,
            password: hashPassword
        }
        await knex('User').insert(user);
        return "Usuário Cadastrado";
    }

    /**
     * @description Realiza a criação do Usuário sem senha, via serviços de terceiros
     * @param {string} name
     * @param {string} email
     * @returns {Promise<boolean>}
     */
    public static async createUserWithoutPassword(name: string, email: string): Promise<boolean> {

        const existingUser = await knex("User").where({ email }).first();
        if (existingUser) {
            throw new EmailDuplicate();
        }
        
        const user = {
            id: v4(),
            name,
            email,
            password: null
        }
        await knex('User').insert(user);
        return true;
    }

    /**
     * @description Realiza a atualização do Usuário (apenas name e password pode ser alterado)
     * @param {string} id
     * @param {UpdateUser} data
     * @returns {Promise<string>}
     */
    public static async updateUser(id: string, data: UpdateUser): Promise<string> {
        await UserValidator.validateUpdateUser(data);

        const user = await knex('User').where({ id }).first();
        if (!user) {
            throw new UserNotFound();
        }

        if(user.email === process.env.ROOT_EMAIL){
            throw new RootUserModificationError("Usuário root não pode ter seus dados cadastrais atualizados");
        } 

        if (data.password) {
            const hashPassword = await hash(data.password, Number(process.env.SALT_ROUNDS));
            data.password = hashPassword;
        }

        await knex('User').where({ id }).update({
            name: data.name,
            password: data.password,
        });
        return "Usuário Atualizado";
    }

    /**
     * @description Delete o usuário do id seleccionado
     * @returns {Promise<string>}
     */
    public static async deleteUser(id: string | undefined): Promise<string>{
        if(!id){
            throw new MissinngDataError("Usuário não informado")
        }

       const linesAffected = await knex("User").where({id: id}).del();

       if(linesAffected > 0){
        return "Usuario deletado com sucesso";
       } else {
        throw new UserNotFound();
       }
       
    }

    public static async forgotPassword(email: string) {
        const user = await knex("User").where({email}).first();

        if(!user) {
            throw new UserNotFound();
        }

        const password = crypto.randomUUID().replace(/-/g, '').slice(0, 8);
        const hashPassword = await hash(password, Number(process.env.SALT_ROUNDS))
        const to = email;
        const subject = "Recuperação de senha";
        
        await knex("User").where({email}).update({
            password: hashPassword
        });

        await mailer.sendMail(to, subject, password);

        return "Senha alterada com sucesso"   
    }
}

