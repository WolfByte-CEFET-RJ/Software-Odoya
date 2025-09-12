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

/**
 * @extends HttpError
 * @description Erro de validação de data (startDate maior que endDate)
 */
export class InvalidDateRange extends HttpError {
  constructor(message: string = 'A data de início não pode ser maior que a data de fim.') {
    super({ status: HttpCode.BAD_REQUEST, message });
  }
}