import { Router } from "express";
import CollectionPointController from "../controllers/collectionPointController";
import AuthMiddleware from "../middlewares/authMiddleware";

const collectionPointRouter = Router();

collectionPointRouter
    /**
     * @route GET /collectionPoints
     * @description Fornece todas as informações de todos os pontos de coleta
     * @returns { CollectionPoint[] }
     */
    .get("/collectionPoints", AuthMiddleware.ensureAuthenticated, CollectionPointController.getAllCollectionPoint)

    /**
     * @route GET /collectionPoint/geocode/:id
     * @description Fornece os dados de um ponto de coleta
     * @param {Number} id
     * @returns { CollectionPoint }
     */
    .get("/collectionPoint/geocode/:id", AuthMiddleware.ensureAdmin, CollectionPointController.getGeocode)

    /**
     * @route GET /collectionPoint/:id
     * @description Fornece os dados de um ponto de coleta
     * @param {Number} id
     * @returns { CollectionPoint }
     */
    .get("/collectionPoint/:id", AuthMiddleware.ensureAuthenticated, CollectionPointController.getOneCollectionPoint)


    

    /**
     * @route POST /collectionPoint
     * @description Cria um novo ponto de coleta
     * @param {Object} CollectionPoint - Dados do ponto de coleta
     * @returns { message: String }
     */
    .post("/collectionPoint", AuthMiddleware.ensureAdmin, CollectionPointController.createCollectionPoint)
    
    /**
     * @route PATCH /collectionPoint/:id
     * @description Atualiza um ponto de coleta existente
     * @param {Number} id - ID do ponto de coleta
     * @param {Partial<CollectionPoint>} - Dados atualizados do ponto de coleta
     * @returns { message: String }
     */
    .patch("/collectionPoint/:id", AuthMiddleware.ensureAdmin, CollectionPointController.updateCollectionPoint)
    
    /**
     * @route DELETE /collectionPoint/delete/:id
     * @description Exclui um ponto de coleta
     * @param {Number} id - ID do ponto de coleta
     * @returns { void }
     */
    .delete("/collectionPoint/delete/:id", AuthMiddleware.ensureAdmin, CollectionPointController.deleteCollectionPoint)

    /**
     * @route GET /report/fullDate/:id
     * @description Retorna a ultima data de coleta e a data de quando o ponto ficou
     * @param {Number} id - ID do ponto de coleta
     * @returns { isFullDate: dateTime , lastCollectionDate:dateTime }
     */
    .get("/report/fullDate/:id", AuthMiddleware.ensureAdmin, CollectionPointController.reportGetFullDate)
    

export default collectionPointRouter;