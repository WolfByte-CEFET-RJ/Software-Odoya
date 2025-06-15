import DatabaseConnection from "../database/connection/DatabaseConnection";
import { UserNotFound } from "../erros/UserErros";
import User from "../types/user";

const database = DatabaseConnection.getInstance();

export default class RootUserService {
    
    /**
     * @description Inverte os cargos de um usuário. Administradores se tornam usuários padrão e vice-versa.
     * @param user_id Identificador do usuário/administrador.
     * @returns {Promise<string>}
     */
    public static async changeRole(user_id: string): Promise<string> {

        // Busca o cargo atual do usuário cadastrado
        const role = await database("User").select("admin").where({ id: user_id }).first();

        if (!role) {
            throw new UserNotFound();
        }
        
        const is_admin: boolean = role.admin === 1;

        /**
         * @values [0 → usuário normal; 1 → admin]
         */
        const new_role: number = is_admin ? 0 : 1;

        await database("User").update({ admin: new_role }).where({ id: user_id });

        return "Cargo atualizado com sucesso!";
    }

        /**
         * @description Verifica se um usuário é um super-usuário
         * @param {User} user
         * @returns {boolean}
         */
        public static checkRootUser(user: User): boolean {
            const isRoot: boolean = (user.email === process.env.ROOT_EMAIL);
            return isRoot;
        }   
}