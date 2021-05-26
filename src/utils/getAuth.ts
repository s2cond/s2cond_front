import { store } from '../index';

const getAuth = () => {
  return store.getState().auth;
};

export default getAuth;
