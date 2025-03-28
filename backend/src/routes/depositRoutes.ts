import { Router } from "express";
import DepositController from "../controllers/depositController";
import AuthMiddleware from "../middlewares/authMiddleware";

/**
 * @class DepositRoutes
 * @description Classe que gerencia as rotas relacionadas aos depósitos
 */
export default class DepositRoutes {
    private router: Router;

    /**
     * @constructor
     * @description Inicializa o router e configura as rotas
     */
    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    /**
     * @method setupRoutes
     * @description Configura todas as rotas de depósitos
     * @private
     */
    private setupRoutes(): void {
        // Rota para buscar todos os depósitos (admin vê todos, usuário vê os seus)
        this.router.get(
            "/deposits", 
            AuthMiddleware.ensureAuthenticated, 
            DepositController.getAllDeposits
        );

        // Rota para buscar um depósito específico
        this.router.get(
            "/deposit/:id", 
            AuthMiddleware.ensureAuthenticated, 
            DepositController.getOneDeposit
        );
    }

    /**
     * @method getRouter
     * @description Retorna o router configurado com todas as rotas
     * @returns {Router} Router do Express com as rotas configuradas
     */
    public getRouter(): Router {
        return this.router;
    }
}