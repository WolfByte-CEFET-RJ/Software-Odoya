import { Router } from "express";
import CollectionPointController from "../controllers/collectionPointController";

const collectionPointRouter = Router();

collectionPointRouter
    .get("/collectionPoints", CollectionPointController.getAllCollectionPoint)
    .get("/collectionPoint/:id", CollectionPointController.getOneCollectionPoint)
    .post("/collectionPoint", CollectionPointController.createCollectionPoint)

export default collectionPointRouter;