import { createReducer } from 'typesafe-actions';
import { LOAD_AUTH, LOAD_INTERESTS } from './action';
import { AuthType } from 'store/auth/types';

const initialState: AuthType = {
  user: {
    uid: '',
    email: '',
    emailVerified: false,
    phoneNumber: '',
    photoUrl: '',
    displayName: '',
    marketing: false,
    hasInvitation: false,
    isLoggedIn: false,
  },
  interests: [],
};

export const toast = createReducer(initialState, {
  [LOAD_INTERESTS]: (state, { payload: interests }) => ({
    ...interests,
    ...state.user,
  }),

  [LOAD_AUTH]: (state, { payload: user }) => ({
    ...state.interests,
    ...user,
  }),
});
