import { Router } from "express";
import AuthMiddleware from "../middlewares/authMiddleware";
import NewsController from "../controllers/newsController";
import UploadPdfConfig from "../middlewares/uploadPDF";

const newsRouter = Router();
const upload = UploadPdfConfig.getUploader()

newsRouter
    /**
     * @route GET /newsletter/:id?
     * @description Retorna um ou todos os links de acesso à newsletters
     * @optional @param id Identificador da newsletter
     */
    .get("/newsletter/:id?", NewsController.getNews)

    /**
     * @route POST /newsletter
     * @description Adiciona uma newsletter
     */
    .post("/newsletter", AuthMiddleware.ensureAdmin, upload.single("newsletter"), NewsController.createNews)

    /**
     * @route DELETE /newsletter/id
     * @description Retorna todos os mutirões do banco. somente admin
     * @param id Identificador da newsletter
     */
    .delete("/newsletter/:id", AuthMiddleware.ensureAdmin, NewsController.deleteNews)

export default newsRouter;