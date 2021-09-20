import React, { useEffect, useState } from 'react';
import Nav from 'components/Nav';
import LoungeUser from 'components/LoungeUser';
import { MEMBER } from 'constants/userStatus';
import { profileType } from 'constants/profileTypes';
import getUsers from 'utils/getUsers';
import styles from 'scss/pages/Landing.module.scss';
import classnames from 'classnames';

type UserDataType = {
  dailyMe: profileType;
  s2condMe: profileType;
  uid: string;
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
        let uid: string = user.uid;
        const newArr: UserDataType = { dailyMe, s2condMe, uid };
        setArrUsers((state) => [...state, newArr]);
      });
    });
  }, []);

  return (
    <div className={classnames('h-screen', styles.landingBody)}>
      <Nav status={MEMBER} />
      <div className="flex flex-wrap justify-center h-2/3 align-middle mt-24 mx-56">
        {arrUsers.length ? (
          arrUsers.map((user, i) => {
            return (
              <LoungeUser
                dailyMe={user.dailyMe}
                s2condMe={user.s2condMe}
                uid={user.uid}
                key={user.uid}
              />
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
