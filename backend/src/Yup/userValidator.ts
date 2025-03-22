import * as Yup from 'yup';


const createUserSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: Yup.string().required('O email é obrigatório').email('O e-mail precisa ser válido'),
    password: Yup.string().required('O campo password é obrigatório.').min(8, 'A senha precisa ter pelo menos 8 caracteres'),
  });

const updateUserSchema = Yup.object({
    name: Yup.string().optional().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    password: Yup.string().optional().min(8, 'A senha precisa ter pelo menos 8 caracteres'),
  });

/**
 * 
 */
export default class UserValidator{
    
    public static async validateCreateUser(userData: {name: string, email: string, password: string}){
        await createUserSchema.validate(userData);
    }

    public static async validateUpdateUser(userData: {name?: string, password?: string}){
        await updateUserSchema.validate(userData);
    }
}