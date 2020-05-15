import { AppUser } from "boardz";
import { AuthStatus } from "auth";

export default interface AuthState {
  appName: string;
  status: AuthStatus;
  user?: AppUser;
}
