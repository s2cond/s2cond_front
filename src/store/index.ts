import { combineReducers } from 'redux';
import { toast } from 'store/toast';
import { ToastType } from 'store/toast/types';
import { ToastAction } from 'store/toast/types';

export type StoreState = {
  toast: ToastType[];
};

const rootReducer = combineReducers<StoreState>({
  toast,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
