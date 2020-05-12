export interface AppUser {
    username: string;
}

export interface EntityList<T> {
    Entities: T[];
    TotalRecords: number;
}
