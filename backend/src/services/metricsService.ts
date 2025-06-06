import DatabaseConnection from "../database/connection/DatabaseConnection";
import Metrics from "../types/metrics";
import CollectionPointService from "./collectionPointService";
import EventService from "./eventService";

const database = DatabaseConnection.getInstance()

/**
  * @class MetricsService
  * @description Serviço para métricas de extensão e parceiros
  */
export class MetricsService {

    /**
     * @description Retorna as métricas de pesquisa e extensão 
     * @returns {Promise<Metrics>}
     */
    public static async getMetrics(): Promise<Metrics>{
        
        const events = await EventService.getAllEvent();

        let spongesCollected = 0;
        const collectionPoints = await CollectionPointService.getAllCollectionPoint();

        collectionPoints.forEach((point)=>{
            spongesCollected += point.amountSponges;
        });

        const metrics = await database("Metrics").select("*").first();

        const result: Metrics = {
            totalEvents: events.length,
            spongesCollected: spongesCollected,
            ...metrics
        }

        return result
    }
}