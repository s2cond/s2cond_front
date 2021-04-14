import React from 'react';
import Nav from 'components/Nav';
import styles from 'scss/pages/Landing.module.scss';
import shinyEffect from 'assets/img/shinyEffect.png';
import welcome from 'assets/img/welcome.png';
import google from 'assets/img/google.png';
import facebook from 'assets/img/facebook.png';
import email from 'assets/img/email.png';
import verifyError from 'utils/verifyError';
import { authService, firebaseInstance } from 'fbase';
import { AuthProvider } from '@firebase/auth-types';
import { useHistory, Link } from 'react-router-dom';
import { LOGGING_IN } from 'constants/userStatus';
import { updateAuth } from 'store/auth/action';
import { useDispatch } from 'react-redux';
import { showToast } from '../store/toast/action';

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const onSocialClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const name = event.currentTarget.getAttribute('name');
    let provider: AuthProvider =
      name === 'google'
        ? new firebaseInstance.auth.GoogleAuthProvider()
        : new firebaseInstance.auth.FacebookAuthProvider();
    await authService
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res.user);
        let user = res.user!;
        dispatch(
          updateAuth({
            uid: user.uid,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoUrl: user.photoURL,
            displayName: user.displayName,
            isLoggedIn: true,
          }),
        );
        history.push('/lounge');
      })
      .catch((err) => {
        dispatch(showToast(verifyError(err.code)));
      });
  };

  return (
    <div className={styles.landingBody}>
      <Nav status={LOGGING_IN} />
      <div className="text-center text-2xl text-s2condLime mt-36 mb-24">
        <img src={welcome} alt="welcome" className="h-20 mx-auto" />
        <div className="flex justify-center  mx-auto">
          <p className="mt-5">반갑습니다, 요원님!</p>
          <img src={shinyEffect} alt="shiny-effect" className="h-8" />
        </div>

        <p className="font-bold ">~~~~~신분을 밝혀주세요~~~~~</p>
      </div>
      <div className="flex justify-center mb-48">
        <div>
          <button
            className="flex items-center w-72 border-1 border-borderGray rounded-full px-6 py-4 mb-2 text-sm text-white font-bold hover:border-s2condLime "
            onClick={onSocialClick}
            name="google"
          >
            <img src={google} alt="google login" className="w-6" />
            <p className="mx-auto text-center">Google 계정으로 로그인</p>
          </button>
          <button
            className="flex items-center w-72 border-1 border-borderGray rounded-full px-6 py-4 mb-2 text-sm text-white font-bold hover:border-s2condLime"
            onClick={onSocialClick}
            name="facebook"
          >
            <img src={facebook} alt="facebook login" className="w-6" />
            <p className="mx-auto text-center">Facebook 계정으로 로그인</p>
          </button>
          <Link
            to={{ pathname: '/email', state: { isLogin: true } }}
            className="flex items-center w-72 border-1 border-borderGray rounded-full px-6 py-4 mb-8 text-sm text-white font-bold hover:border-s2condLime"
          >
            <img src={email} alt="email signup" className="w-6" />
            <p className="mx-auto text-center">이메일 계정으로 로그인</p>
          </Link>
          <Link to="/findAccount" className="flex justify-center">
            <p className="inline-flex text-sm text-white border-b-1 border-white ">
              이메일/비밀번호 찾기
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
