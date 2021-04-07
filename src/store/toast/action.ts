import { createAction } from 'typesafe-actions';

export const SHOW_TOAST = 'toast/SHOW_TOAST';
export const DELETE_TOAST = 'toast/DELETE_TOAST';

export const showToast = createAction(SHOW_TOAST)<string>();
export const deleteToast = createAction(DELETE_TOAST)<string>();
