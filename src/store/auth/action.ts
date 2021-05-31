import { createAction } from 'typesafe-actions';

export const UPDATE_INTERESTS = 'auth/UPDATE_INTEREST';
export const UPDATE_AUTH = 'auth/UPDATE_AUTH';

export const updateInterest = createAction(
  UPDATE_INTERESTS,
  (interests) => interests,
)<string>();
export const updateAuth = createAction(UPDATE_AUTH, (user) => user)<string>();
