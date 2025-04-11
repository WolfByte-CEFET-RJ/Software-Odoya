import DatabaseConnection from "../database/connection/DatabaseConnection";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ExternalAuthRequired, InvalidCredentialsError, InvalidExternalToken } from "../erros/LoginError";
import { v4 } from "uuid";
import User from "../types/user";
import AuthValidator from "../utils/Yup/authValidator";
import UserService from "./userService";

const database = DatabaseConnection.getInstance();

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

        await AuthValidator.validateLogin({email, password})

        const user = await UserService.getUserWithSensitiveData(email)

        if(!user){
            throw new InvalidCredentialsError();
        }

        if(!user.password){
            throw new ExternalAuthRequired()
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch)

        if(!passwordMatch){
            throw new InvalidCredentialsError();
        }

        const token = this.generateToken(user)

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
        
        // Buscando informações do usuário
        let user = await UserService.getUserByEmail(googleUserInfo.email)
        
        if (!user) {
            // Cria usuário sem senha, se ele não existir
            await UserService.createUserWithoutPassword(googleUserInfo.name, googleUserInfo.email);
            
            // Busca as informações do usuário novamente
            user = await UserService.getUserByEmail(googleUserInfo.email);
        } 
        
        const system_token = this.generateToken(user);

        return system_token;
    }

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