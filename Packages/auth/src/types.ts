export enum AuthStatus {
    LoggedOut = "LoggedOut",
    LoggingIn = "LoggingIn",
    LoggedIn = "LoggedIn",
    LoginFailed = "LoginFailed",
    Refreshing = "Refreshing",
    Registering = "Registering",
    Locked = "Locked",
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
