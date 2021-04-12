import * as actions from 'store/toast/action';
import { ActionType } from 'typesafe-actions';
import { interestsType } from 'constants/interests';

export type User = {
  uid: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  photoUrl: string;
  displayName: string;
  marketing: boolean;
  hasInvitation: boolean;
};

export type AuthType = {
  user: User & {
    isLoggedIn: boolean;
  };
  interests: interestsType[];
};

export type AuthAction = ActionType<typeof actions>;
