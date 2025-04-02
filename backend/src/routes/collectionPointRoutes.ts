import { Router } from "express";
import CollectionPointController from "../controllers/collectionPointController";
import AuthMiddleware from "../middlewares/authMiddleware";

const collectionPointRouter = Router();

collectionPointRouter
    .get("/collectionPoints", AuthMiddleware.ensureAuthenticated, CollectionPointController.getAllCollectionPoint)
    .get("/collectionPoint/:id", AuthMiddleware.ensureAuthenticated, CollectionPointController.getOneCollectionPoint)
    .post("/collectionPoint", AuthMiddleware.ensureAuthenticated, AuthMiddleware.ensureAdmin, CollectionPointController.createCollectionPoint)
    .patch("/collectionPoint/:id", AuthMiddleware.ensureAuthenticated, AuthMiddleware.ensureAdmin, CollectionPointController.updateCollectionPoint)
    .delete("/collectionPoint/delete/:id", AuthMiddleware.ensureAuthenticated, AuthMiddleware.ensureAdmin, CollectionPointController.deleteCollectionPoint)

export default collectionPointRouter;