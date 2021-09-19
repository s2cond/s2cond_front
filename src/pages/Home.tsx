import React, { useEffect, useState } from 'react';
import Nav from 'components/Nav';
import LoungeUser from 'components/LoungeUser';
import { authService, dbService } from '../fbase';
import { MEMBER } from 'constants/userStatus';
import getUsers from 'utils/getUsers';
import { profileType } from 'constants/profileTypes';

type UserDataType = {
  dailyMe: profileType;
  s2condMe: profileType;
};

const Home = () => {
  // const user = authService.currentUser;
  const [arrUsers, setArrUsers] = useState<UserDataType[]>([]);
  const users = getUsers();
  useEffect(() => {
    users.then((data) => {
      data.forEach((user) => {
        let dailyMe: profileType = user.dailyMe;
        let s2condMe: profileType = user.s2condMe;
        const newArr: UserDataType = { dailyMe, s2condMe };
        setArrUsers([...arrUsers, newArr]);
      });
    });
  }, []);

  return (
    <>
      <Nav status={MEMBER} />
      {arrUsers.length ? (
        arrUsers.map((user) => {
          return <LoungeUser dailyMe={user.dailyMe} s2condMe={user.s2condMe} />;
        })
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default Home;
