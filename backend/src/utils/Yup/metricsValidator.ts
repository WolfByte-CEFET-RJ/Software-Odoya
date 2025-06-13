import * as Yup from 'yup';
import Metrics from '../../types/metrics';

const partnerSchema = Yup.object({
  name: Yup.string().required('Nome do parceiro é obrigatório'),
  logo: Yup.string().url('Logo deve ser uma URL válida').required('Logo do parceiro é obrigatório')
})

const metricsSchema = Yup.object({
  climateInitiatives: Yup.number().min(0, "Quantidade de ações deve ser maior ou igual a 0"),
  livesImpacteds: Yup.number().min(0, "Quantidade de vidas impactadas deve ser maior ou igual a 0"),
  kgRecycled: Yup.number().min(0, "Quantidade de kg recicaldos deve ser maior ou igual a 0"),
  partners: Yup.array().of(partnerSchema)
})

export default class MetricsValidator{

    public static async validateMetrics(data: Partial<Metrics>){
        await metricsSchema.validate(data, { abortEarly: false });
    }
}