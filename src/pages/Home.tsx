import React from 'react';
import Nav from 'components/Nav';
import { authService } from '../fbase';
import { MEMBER } from 'constants/userStatus';

const Home = () => {
  const user = authService.currentUser;

  return (
    <div>
      <Nav status={MEMBER} />
      {user?.displayName}
      {user?.phoneNumber}
      {user?.email}
    </div>
  );
};

export default Home;
