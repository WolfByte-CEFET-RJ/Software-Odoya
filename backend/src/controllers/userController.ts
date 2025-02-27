import { Request, Response } from 'express';
const userService = require('../services/userService');
import { HttpCode, HttpError } from '../erros/erro.config';


module.exports = {
    async createUser(req: Request, res: Response){
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(HttpCode.BAD_REQUEST).json({ message: "Nome, e-mail e senha são obrigatórios" });
        }
        try{
            const response = await userService.createUser(name, email, password);
            return res.status(HttpCode.CREATED).json({message: response});
        }catch(e: any){
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 

            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
        }
    }
}