export enum RegistrationStatus {
    PENDENTE = "PENDENTE",
    APROVADO = "CONFIRMADO",
    REPROVADO = "CANCELADO"
}

export default interface Registration {
    eventId: string,
    userId: string
    status: RegistrationStatus,
    created_at: Date,
    updated_at: Date
}