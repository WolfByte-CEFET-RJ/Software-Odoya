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