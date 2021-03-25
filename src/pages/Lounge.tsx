import React from 'react';
import Nav from 'components/Nav';
import { authService } from '../fbase';
import { MEMBER } from 'constants/userStatus';

const Lounge = () => {
  const user = authService.currentUser;

  return (
    <div>
      <Nav status={MEMBER} />
      {user?.displayName}
    </div>
  );
};

export default Lounge;
