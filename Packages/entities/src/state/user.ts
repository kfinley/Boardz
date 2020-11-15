import { AppUser } from '../types';
import { UserStatus } from './types';

export interface UserState {
    status: UserStatus;
    user?: AppUser;
  }