export type THistoryResponse = {
    status: {
        code: number;
        message: string;
    }
    total: number;
    data: THistoryEntity[];
    error?: number
}

export type THistoryEntity = {
    id: number;
    name: string;
    descriptions: string;
    fromDate: number;
    toDate: number;
}

export type THistoryCreateBody = Omit<THistoryEntity, 'id'>