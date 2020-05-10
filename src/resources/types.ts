
export interface AppUser {
    username: string;
}

export interface Credentials {
    username: string;
    password: string;
    // authUrl?: string;
    // clientId?: string;
    // clientSecret?: string;
}

export interface AuthResponse {
    AccessToken: string;
    RefreshToken: string;
    Success: string;
}

export interface EntityList<T> {
    Entities: T[];
    TotalRecords: number;
}
