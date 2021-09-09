import React from 'react';
import Nav from 'components/Nav';
import { authService } from '../fbase';
import { MEMBER } from 'constants/userStatus';

const MyPage = () => {
  const user = authService.currentUser;
  console.log(user);
  return (
    <div>
      <Nav status={MEMBER} />
      <div>
          <div>
              <div></div>
          </div>
      </div>

      {user?.displayName}
      {user?.phoneNumber}
      {user?.email}
    </div>
  );
};

export default MyPage;
