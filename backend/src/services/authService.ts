import DatabaseConnection from "../database/connection/DatabaseConnection";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { RequiredFieldsError, InvalidCredentialsError } from "../erros/LoginError";
import { v4 } from "uuid";
import User from "../types/user";

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
     * @returns { message: string; token?: string; }
     */
    public static async login(email: string, password: string): Promise<string>{

        const isAnyFieldEmpty = (!email || !password);

        if(isAnyFieldEmpty){
            throw new RequiredFieldsError();
        }

        const user = await database('User')
            .select("id", "name", "email", "password", "admin")
            .where({email}).first()

        if(!user){
            throw new InvalidCredentialsError();
        }

        if(!user.password){
            throw new Error("Esse perfil só aceita login com Google. Altere sua senha para logar normalmente")
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw new InvalidCredentialsError();
        }

        const token = this.generateToken(user)

        return token;
    }

    /**
     * @description Realiza login para usuários autenticáveis com Google
     * @param {string} token - acess_token do Google API 
     * @returns token: string
     */
    public static async handleGoogleAuth(token: string): Promise<string> {
        // Busca informações do usuário e valida o access_token
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const googleUserInfo = await userInfoResponse.json();
    
        if (!googleUserInfo.email || !googleUserInfo.name) {
            throw new Error("Token inválido ou usuário sem informações necessárias associadas.");
        }
        
        // Buscando informações do usuário
        let user = await database("User").where({ email: googleUserInfo.email }).first();
        
        if (!user) {
            // Cria usuário sem senha, se ele não existir
            await database("User").insert({
                id: v4(),
                name: googleUserInfo.name,
                email: googleUserInfo.email,
            });
            
            // Busca as informações do usuário novamente
            user = await database("User").where({ email: googleUserInfo.email }).first();
        } 
        
        const system_token = this.generateToken(user)

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