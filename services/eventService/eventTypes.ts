export type TEventResponse = {
    status: {
        code: number;
        message: string;
    };
    total: number;
    data: TEventEntity[];
}

export type TEventEntity = {
    id: number;
    name: string;
    descriptions: string;
    date: number;
}