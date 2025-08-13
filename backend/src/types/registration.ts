export enum RegistrationStatus {
    PENDING = "PENDENTE",
    APPROVED = "CONFIRMADO",
    CANCELED = "CANCELADO"
}

export interface GroupedRegistration {
    eventId: string,
    eventName: string,
    users: {
        userId: string,
        userName: string,
        status: string,
        created_at: Date,
        updated_at: Date
    }[]
}

export interface Registration {
    eventId: string,
    userId: string
    status: RegistrationStatus,
    created_at: Date,
    updated_at: Date
}