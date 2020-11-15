export interface AppUser {
    username: string;
}

export enum SortDirection {
    Ascending,
    Descending
}

export interface EntitySet {
    pageNumber: number,
    pageSize: number, 
    sortBy?: string,
    sortDirection?: SortDirection,
    filters: any,
    properties: Array<string>
    current: [],
    all: [] 
}

export interface EntityResult<T> {
    Entities: T[];
    TotalRecords: number;
}
