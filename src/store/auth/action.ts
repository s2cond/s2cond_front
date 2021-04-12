import { AuthType } from 'store/auth/types';
import { createAction } from 'typesafe-actions';

export const SHOW_TOAST = 'toast/SHOW_TOAST';
export const DELETE_TOAST = 'toast/DELETE_TOAST';

export const showToast = createAction(SHOW_TOAST, (text) => text)<string>();
export const deleteToast = createAction(DELETE_TOAST, (id) => id)<string>();
