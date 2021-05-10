import { combineReducers } from 'redux';
import { toast } from 'store/toast';
import { auth } from 'store/auth';
import { ToastType } from 'store/toast/types';
import { AuthType } from 'store/auth/types';

export type StoreState = {
  toast: ToastType[];
  auth: AuthType;
};

const rootReducer = combineReducers<StoreState>({
  toast,
  auth,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
