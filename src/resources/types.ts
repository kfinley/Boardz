export interface Board {
    name: string;
}

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


export interface EntitiesResponse {
    Entities: [];
    TotalRecortds: number;
}