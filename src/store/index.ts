import { combineReducers } from 'redux';
import { toast } from 'store/toast';
import { toastType } from 'models/toast';

export type StoreState = {
  toast: toastType[];
};

const rootReducer = combineReducers<StoreState>({
  toast,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
