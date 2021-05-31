import { createReducer } from 'typesafe-actions';
import { UPDATE_AUTH, UPDATE_INTERESTS } from './action';
import { AuthType } from 'store/auth/types';

const initialState: AuthType = {
  user: {
    uid: '',
    email: '',
    phoneNumber: '',
    photoUrl: '',
    displayName: '',
    // marketing: false,
    // hasInvitation: false,
    isLoggedIn: false,
  },
  interests: [],
};

export const auth = createReducer(initialState, {
  [UPDATE_INTERESTS]: (state, { payload: interests }) => ({
    interests: { ...interests },
    user: state.user,
  }),
  [UPDATE_AUTH]: (state, { payload: user }) => ({
    interests: state.interests,
    user: { ...user },
  }),
});

// export const toast = createReducer(initialState, {
//   [LOAD_INTERESTS]: (state, { payload: interests }) => ({
//     ...interests,
//     user: state.user,
//   }),
//   [LOAD_AUTH]: (state, { payload: user }) => ({
//     interests: state.interests,
//     ...user,
//   }),
// });
