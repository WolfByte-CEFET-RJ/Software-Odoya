import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ExternalAuthRequired, InvalidCredentialsError, InvalidExternalToken } from "../erros/LoginError";
import User from "../types/user";
import AuthValidator from "../utils/Yup/authValidator";
import UserService from "./userService";
import { UserNotFound } from "../erros/UserErros";

/**
 * @class AuthService
 * @description Serviço para autenticação.
 */
export class AuthService {
    /**
     * @description Realiza Login.
     * @param {string} email - O email do usuário.
     * @param {string} password - A senha do usuário.
     * @returns {Promise<string>}
     */
    public static async login(email: string, password: string): Promise<string>{

        await AuthValidator.validateLogin({email, password});

        let user;
        try{
            user = await UserService.getUserSensitiveByEmail(email);
        } catch(e: any){

            if(e instanceof UserNotFound){
                throw new InvalidCredentialsError();
            }
            // Propagando o erro inesperado caso não seja a falta do usuário
            throw e;
        }

        if(!user.password){
            throw new ExternalAuthRequired();
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw new InvalidCredentialsError();
        }

        const token = this.generateToken(user);

        return token;
    }

    /**
     * @description Realiza login para usuários autenticáveis com Google
     * @param {string} token - acess_token do Google API 
     * @returns {Promise<string>}
     */
    public static async handleGoogleAuth(token: string): Promise<string> {

        // Busca informações do usuário e valida o access_token
        const googleResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const googleUserInfo = await googleResponse.json();

        if (!googleUserInfo.email || !googleUserInfo.name) {
            throw new InvalidExternalToken(Number(googleUserInfo.error.code), `Google API retornou: ${googleUserInfo.error.message}`);
        }
        
        let user; 
        try{
            user = await UserService.getUserSensitiveByEmail(googleUserInfo.email);

        } catch(e:any){

            if (e instanceof UserNotFound) {
                // Cria usuário sem senha, se ele não existir
                await UserService.createUserWithoutPassword(googleUserInfo.name, googleUserInfo.email);
                
                // Busca as informações do usuário novamente (que acabou de ser criado)
                user = await UserService.getUserSensitiveByEmail(googleUserInfo.email);

            } else{
                // Propagando o erro inesperado caso não seja a falta do usuário
                throw e;
            } 
        }
        
        const system_token = this.generateToken(user);

        return system_token;
    }

    /**
     * Gera token de autenticação do usuário
     * @param {User} user 
     * @returns {String} token de autenticação
     */
    private static generateToken(user: User): string{
        return jsonwebtoken.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name,
                admin: user.admin
            },
            process.env.JWT_SECRET!,
            { expiresIn: "24h" }
        );
    }
}