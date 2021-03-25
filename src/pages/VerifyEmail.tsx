import React, { useEffect } from 'react';
import starsEyes from 'assets/img/starsEyes.png';
import styles from 'scss/pages/Landing.module.scss';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

const VerifyEmail = () => {
  const history = useHistory();
  const user = authService.currentUser;
  useEffect(() => {
    console.log(user?.emailVerified);
    user?.emailVerified && history.push('/signup/verifyphone');
  }, [history, user?.emailVerified]);

  return (
    <div className={styles.landingBody}>
      <div className="text-center h-screen pt-36">
        <div className="mb-36">
          <img src={starsEyes} alt="stars-eyes" className="mx-auto" />
          <p className="text-2xl font-bold text-s2condLime">
            이메일 인증을 보냈습니다
          </p>
          <p className="font-thin text-s2condLime">
            {user?.email}을 확인하여 주세요
          </p>
        </div>
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
};

export default VerifyEmail;
