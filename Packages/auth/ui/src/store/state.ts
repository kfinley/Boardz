import { AppUser } from "entities";
import { AuthStatus } from "auth";

export default interface AuthState {
  appName: string;
  status: AuthStatus;
  user?: AppUser;
}
