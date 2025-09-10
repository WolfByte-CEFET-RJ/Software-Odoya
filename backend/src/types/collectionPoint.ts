
export default interface CollectionPoint {
    id: string;
    name: string;
    location: string;
    capacitySponges: number;
    amountSponges: number;
    lastCollectionDate: Date;
    nextCollectionDate: Date;
    isInactive: boolean;
}

export type UpdateCollectionPoint = {
    name?: string;
    location?: string;
    capacitySponges?: number;
    amountSponges?: number;
    lastCollectionDate?: Date;
    nextCollectionDate?: Date;
    isInactive?: boolean;
}
