/**
 * @interface
 * @description Representação segura do usuário.
 */
export default interface User {
    id: string;
    name: string;
    email: string;
    admin: boolean;
    points: number;
}

export interface UpdateUser {
    name?: string;
    password?: string;
}

export enum Flag {
                TRUE = "1",
                FALSE = "0",
                UNDEFINIED = "2"
            }