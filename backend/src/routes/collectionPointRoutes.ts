import { Router } from "express";
import CollectionPointController from "../controllers/collectionPointController";
import AuthMiddleware from "../middlewares/authMiddleware";

const collectionPointRouter = Router();

collectionPointRouter
    .get("/collectionPoints", CollectionPointController.getAllCollectionPoint)
    .get("/collectionPoint/:id", CollectionPointController.getOneCollectionPoint)
    .post("/collectionPoint", CollectionPointController.createCollectionPoint)

export default collectionPointRouter;