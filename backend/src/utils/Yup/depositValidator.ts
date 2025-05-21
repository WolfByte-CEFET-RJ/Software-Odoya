import * as Yup from 'yup';
import { DepositStatus } from '../../types/deposit';

const createDepositSchema = Yup.object({
    amountSponges: Yup.number().required('Quantidade de esponjas é obrigatório').min(1,'A quantidade de esponjas deve ser maior que 0'),
    imageURL: Yup.string().optional().url('A URL precisa ser válida'),
});

//Para o Yup, a string "" é um valor definido (!== undefined), então o .required não faz nada pois o campo não esta ausente. É necessário transformar para undefined antes.
const updateDepositStatusSchema = Yup.object({
    status: Yup.string()
  .transform(value => (value === '' ? undefined : value))
  .required('Status tem que constar!')
  .oneOf(Object.values(DepositStatus), 'Status inválido.')

});

export default class depositValidator{
    
    public static async validateCreateDeposit(userData: {amountSponges: number, imageURL: string}){
        await createDepositSchema.validate(userData, { abortEarly: false });
    
    }

    public static async validateUpdateDepositStatus(userData: {status: string}){
        await updateDepositStatusSchema.validate(userData, { abortEarly: false });
    }

}
