import * as Yup from 'yup';

const loginSchema = Yup.object({
    email: Yup.string().required('O email é obrigatório').email('O e-mail precisa ser válido'),
    password: Yup.string().required('A senha é obrigatória.').min(8, 'A senha precisa ter pelo menos 8 caracteres'),
  }
);

/**
 * @class AuthValidator
 * @description Validação das entradas de autenticação
 */
export default class AuthValidator{
    
    /**
     * @param {{email: string, password: string}} credentials - Email e senha do usuário
     */
    public static async validateLogin(credentials: {email: string, password: string}){
        await loginSchema.validate(credentials, { abortEarly: false });
    }
}