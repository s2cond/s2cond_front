import React, { useEffect } from 'react';
import Nav from 'components/Nav';
import starsEyes from 'assets/img/starsEyes.png';
import styles from 'scss/pages/Landing.module.scss';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';
import { NONE } from 'constants/userStatus';
import usePageVisibility from '../hooks/usePageVisibility';
import { getInterest } from '../utils/getInterest';

const VerifyEmail = () => {
  const history = useHistory();
  const isVisible = usePageVisibility();
  const user = authService.currentUser;
  const userInterest = getInterest();

  const resendMail = () => {
    authService?.currentUser
      ?.sendEmailVerification()
      .then(() => {
        console.log('Email send Success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log('interests: ', userInterest);
    //탭 이동마다 상태를 업데이트
    isVisible && user?.reload();
    if (user?.emailVerified) {
      user.updateProfile({
        displayName: `${user.email?.slice(0, 5)}요원`,
      });

      dbService.collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        photoUrl: user.photoURL,
        displayName: user.displayName,
        hasInvitation: false,
        interests: userInterest,
      });
      history.push('/signup/verifyphone');
    }
  }, [history, user, isVisible]);

  return (
    <div className={styles.landingBody}>
      <Nav status={NONE} />
      <div className="text-center h-screen pt-36">
        <div className="mb-36">
          <img
            src={starsEyes}
            alt="stars-eyes"
            className="w-20 h-auto mx-auto"
          />
          <p className="text-2xl font-bold text-s2condLime">
            이메일 인증을 보냈습니다
          </p>
          <p className="font-thin text-s2condLime">
            {user?.email}을 확인하여 주세요
          </p>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="border-1 border-s2condLime bg-bgBlack text-center text-s2condLime rounded-full h-12 w-96 mb-24 font-bold focus:outline-none hover:bg-s2condLime  hover:text-black"
            onClick={resendMail}
          >
            재전송 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
