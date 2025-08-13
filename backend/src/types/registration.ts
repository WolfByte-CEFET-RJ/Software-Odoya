export enum RegistrationStatus {
    PENDING = "PENDENTE",
    APPROVED = "CONFIRMADO",
    CANCELED = "CANCELADO"
}

export default interface Registration {
    eventId: string,
    userId: string
    status: RegistrationStatus,
    created_at: Date,
    updated_at: Date
}