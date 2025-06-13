import * as Yup from 'yup';
import CollectionPoint, { UpdateCollectionPoint } from "../../types/collectionPoint"

const createCollectionPointSchema = Yup.object({
    name: Yup.string()
        .required('O nome é obrigatório')
        .min(3, 'O nome deve ter pelo menos 3 caracteres'),

    location: Yup.string()
        .required('A localização é obrigatória'),

    capacitySponges: Yup.number()
        .required('A capacidade de esponjas é obrigatória')
        .positive('A capacidade deve ser um número positivo')
        .integer('A capacidade deve ser um número inteiro'),

    amountSponges: Yup.number()
        .required('A quantidade de esponjas é obrigatória')
        .min(0, 'A quantidade não pode ser negativa')
        .integer('A quantidade deve ser um número inteiro'),

    lastCollectionDate: Yup.date()
        .required('A data da última coleta é obrigatória'),

    nextCollectionDate: Yup.date()
        .required('A data da próxima coleta é obrigatória'),

    isInactive: Yup.boolean()
        .required('O status de inatividade é obrigatório')
});

const updateCollectionPointSchema = Yup.object({
    name: Yup.string()
        .optional()
        .min(5, 'O nome deve ter pelo menos 5 caracteres'),

    location: Yup.string().optional(),

    capacitySponges: Yup.number()
        .optional()
        .positive('A capacidade deve ser um número positivo')
        .integer('A capacidade deve ser um número inteiro'),

    amountSponges: Yup.number()
        .optional()
        .min(0, 'A quantidade não pode ser negativa')
        .integer('A quantidade deve ser um número inteiro'),

    lastCollectionDate: Yup.date().optional(),

    nextCollectionDate: Yup.date().optional(),

    isInactive: Yup.boolean().optional()
});

/**
 * Classe responsável por validar dados de CollectionPoint
 */
export default class CollectionPointValidator {

  public static async validateCreate(data: Omit<CollectionPoint, 'id'>) {
    await createCollectionPointSchema.validate(data, { abortEarly: false });
  }

  public static async validateUpdate(data: UpdateCollectionPoint) {
    await updateCollectionPointSchema.validate(data, { abortEarly: false });
  }
}
