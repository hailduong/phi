export type TEventResponse = {
    status: {
        code: number;
        message: string;
    };
    total: number;
    data: TEventEntity[];
    error?: number
}

export type TEventEntity = {
    id: number;
    name: string;
    descriptions: string;
    date: number;
    dateRemind: number;
    time?: number
}

export type TEventCreateBody =Omit<TEventEntity, 'id'>