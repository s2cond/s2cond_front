import * as actions from 'store/toast/action';
import { ActionType } from 'typesafe-actions';

export type ToastType = {
  id: string;
  text?: string;
};

export type ToastAction = ActionType<typeof actions>;
