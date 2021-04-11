import { SHOW_TOAST, DELETE_TOAST } from 'store/toast/action';
import { nanoid } from 'nanoid';
import { createReducer } from 'typesafe-actions';
import { ToastAction, ToastType } from 'store/toast/types';

const initialState: ToastType[] = [];

export const toast = createReducer(initialState, {
  [SHOW_TOAST]: (state: ToastType[], { payload: text }) => [
    { id: nanoid(), text: text },
    ...state,
  ],

  [DELETE_TOAST]: (state: ToastType[], { payload: id }) =>
    state.filter((toast: ToastType) => toast.id !== id),
});

// export const toast = (
//   state = initialState,
//   action: ToastAction,
// ): toastType[] => {
//   const { payload, type } = action;
//   switch (type) {
//     case SHOW_TOAST:
//       return [{ id: nanoid(), text: payload }, ...state];
//     case DELETE_TOAST:
//       return state.filter((toast: toastType) => toast.id !== payload);
//     default:
//       return state;
//   }
// };
