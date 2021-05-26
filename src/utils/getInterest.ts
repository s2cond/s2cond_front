import getAuth from './getAuth';

export const getInterest = () => {
  return getAuth().interests.length
    ? getAuth().interests
    : localStorage.getItem('interests') || '{}';
};
