import { RegistrationStatus } from "../types/registration";

export class RegistrationValidator {
    public static isStatusValid(status: string){
        return Object.values(RegistrationStatus).includes(status as RegistrationStatus);
    }
}