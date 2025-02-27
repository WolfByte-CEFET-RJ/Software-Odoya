import { compareSync, hash } from "bcryptjs";
import DatabaseConnection from "../database/connection/DatabaseConnection";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class AuthService {
    public static async login(email: string, password: string){
        const database = DatabaseConnection.getInstance();

        const user = await database('User')
            .select("id", "name", "email", "password", "admin")
            .where({email}).first()

        if(!user){
            //lancar erro UserNotFound ou InvalidEmail
            console.log("Email incorreto.");
            throw new Error("Email incorreto");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            //lancar erro Senha Invalida
            console.log("Senha invalida.");
            throw new Error("Senha Invalida");
        }

        const token = jsonwebtoken.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            admin: user.admin
        }, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        })

        return token;
    }
}