export enum DepositStatus {
    PENDENTE = "PENDENTE",
    APROVADO = "APROVADO",
    REPROVADO = "REPROVADO"
}

export default interface Deposit {
    id: string,
    collectionPointId: string,
    userId: string,
    amountSponges: number,
    imageURL?: string,
    status: DepositStatus,
    created_at: Date,
    updated_at: Date

}