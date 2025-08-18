import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import FileService from "../services/FileService";
import NewsService from "../services/newsService";
import { MissinngDataError } from "../erros/CommonErros";
import { HttpCode } from "../erros/erro.config";

export default class NewsController{

    public static async createNews(req: Request, res: Response, next: NextFunction): Promise<any>{
        
        // Dados gerados automaticamente compartilhados entre as services
        const id: string = v4();
        const date: Date = new Date()
        
        try{
            const file = req.file;
            const {summary} = JSON.parse(req.body.newsData)

            if(!file){
                throw new MissinngDataError("Arquivo não indexado corretamente");
            }

            const link = await FileService.upload(file.buffer, id);

            const response = await NewsService.createNews({id, summary, date, link});

            return res.status(HttpCode.CREATED).json({message: response});

        } catch(e: any){
            await FileService.remove(id);
            next(e);
        }
    }

    public static async deleteNews(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            
            const {id} = req.params

            await NewsService.deleteNews(id);

            await FileService.remove(id);

            return res.status(HttpCode.NO_CONTENT).send()

        } catch(e: any){
            next(e)
        }
    }

    public static async getNews(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            const {id} = req.params
            
            let newsletter = undefined;

            if(id){
                newsletter = await NewsService.getNews(id);
            } else{
                newsletter = await NewsService.getAllNews();
            }

            return res.status(HttpCode.OK).json({newsletter})

        } catch(e: any){
            next(e)
        }
    }
}