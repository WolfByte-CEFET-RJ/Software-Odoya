import { Request, Response } from "express";
import { HttpCode, HttpError } from "../erros/erro.config";
import DepositService from "../services/depositService";
import { ImprevistError } from "../erros/ImprevistError";
import Deposit from "../types/deposit";

export default class DepositController {
  /**
   * Obtém todos os depósitos (todos para admin, somente do usuário para usuário comum)
   */
  public static async getAllDeposits(req: Request, res: Response) {
      try {
          // Verifica se o usuário é admin através do middleware
          const isAdmin = req.user?.admin || false;
          const userId = req.user?.id as string;

          const deposits: Deposit[] = await DepositService.getAllDeposits(userId, isAdmin);
          res.status(HttpCode.OK).json(deposits);
      } catch (e) {
          if (e instanceof HttpError) {
              return e.sendMessage(res);
          }

          const classified_err = new ImprevistError();
          return classified_err.sendMessage(res);
      }
  }

  /**
   * Obtém um depósito específico
   */
  public static async getOneDeposit(req: Request, res: Response) {
      const { id } = req.params;

      try {
          // Verifica se o usuário é admin através do middleware
          const isAdmin = req.user?.admin || false;
          const userId = req.user?.id as string;

          const deposit: Deposit = await DepositService.getDeposit(id, userId, isAdmin);
          res.status(HttpCode.OK).json(deposit);
      } catch (e) {
          if (e instanceof HttpError) {
              return e.sendMessage(res);
          }

          const classified_err = new ImprevistError();
          return classified_err.sendMessage(res);
      }
  }
}