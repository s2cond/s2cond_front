import React from 'react';
import { authService } from '../fbase';

const Lounge = () => {
  const user = authService.currentUser;

  return <div>{user?.displayName}</div>;
};

export default Lounge;
