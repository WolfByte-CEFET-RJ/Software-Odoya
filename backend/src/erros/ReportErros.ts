import { HttpCode, HttpError } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro de relatório não encontrado (nenhum dado retornado)
 */
export class ReportNotFound extends HttpError {
  constructor(message: string = 'Nenhum dado encontrado para o período informado') {
    super({ status: HttpCode.NOT_FOUND, message });
  }
}