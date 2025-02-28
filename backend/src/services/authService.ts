import { compareSync, hash } from "bcryptjs";
import DatabaseConnection from "../database/connection/DatabaseConnection";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
        const database = DatabaseConnection.getInstance();

        const user = await database('User')
            .select("id", "name", "email", "password", "admin")
            .where({email}).first()

        if(!user){
            throw new Error("Email incorreto");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Senha Invalida");
        }

        const token = jsonwebtoken.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            admin: user.admin
        }, process.env.JWT_SECRET!, {
            expiresIn: '24h'
        })

        return token;
    }
}