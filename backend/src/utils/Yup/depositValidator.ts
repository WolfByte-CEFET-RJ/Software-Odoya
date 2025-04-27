import * as Yup from 'yup';

const createDepositSchema = Yup.object({
    amountSponges: Yup.number().required('Quantidade de esponjas é obrigatório').min(1,'A quantidade de esponjas deve ser maior que 0'),
    imageURL: Yup.string().optional().url('A URL precisa ser válida'),
});

export default class depositValidator{
    
    public static async validateCreateDeposit(userData: {amountSponges: number, imageURL: string}){
        await createDepositSchema.validate(userData, { abortEarly: false });
    
    }

}
