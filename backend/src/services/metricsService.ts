import DatabaseConnection from "../database/connection/DatabaseConnection";
import { ImprevistError } from "../erros/ImprevistError";
import Metrics from "../types/metrics";
import MetricsValidator from "../utils/Yup/metricsValidator";
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

        const spongesCollected = await CollectionPointService.getTotalSpongesInPoints()

        const metrics = await database("Metrics").select("*").first();

        if(!metrics){
            throw new ImprevistError("Métricas-base não registradas.")
        }

        const result: Metrics = {
            totalEvents: events.length,
            spongesCollected: spongesCollected,
            ...metrics
        }

        return result
    }

    /**
     * @description Atualiza métricas e parceiros
     * @returns {Promise<String>}
     */
    public static async updateMetrics(metrics: Partial<Metrics>): Promise<String>{

        await MetricsValidator.validateMetrics(metrics)
        
        const rows = await database("Metrics").update({
            climateInitiatives: metrics.climateInitiatives,
            livesImpacteds: metrics.livesImpacteds,
            kgRecycled: metrics.kgRecycled,
            partners: JSON.stringify(metrics.partners)
        });

        if(rows!=1) {
            // Não fatal.
            console.warn(`Tabela de métricas inconsistente. Há ${rows} registros quando deveria haver 1.`)
        }

        return "Métricas atualizadas"
    }
    
}