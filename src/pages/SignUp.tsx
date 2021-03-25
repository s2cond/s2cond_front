import React from 'react';
import styles from 'scss/pages/Landing.module.scss';
import signupGun from 'assets/img/signupGun.png';
import google from 'assets/img/google.png';
import facebook from 'assets/img/facebook.png';
import email from 'assets/img/email.png';
import { Link, useHistory } from 'react-router-dom';
import { authService, firebaseInstance } from 'fbase';
import { AuthProvider } from '@firebase/auth-types';

const SignUp = () => {
  let history = useHistory();

  const onSocialClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const name = (event.target as HTMLButtonElement).name;
    let provider: AuthProvider;
    let user;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else {
      provider = new firebaseInstance.auth.FacebookAuthProvider();
    }
    await authService
      .signInWithPopup(provider)
      .then((res) => {
        user = res.user;
        history.push('/signup/verifyphone');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className={styles.landingBody}>
      <div className="text-center text-s2condLime mt-36 mb-24">
        <img src={signupGun} alt="signup-gun" className="mx-auto" />
        <p className="text-lg font-bold">
          회원가입 할 계정 혹은 이메일을 선택 해 주세요
        </p>
        <p className="font-thin">
          s2cond에 가입 하시려면 이미 가입한 지인의 초대가 필요 합니다.
          <br />
          아직 초대장이 없으신 분은 요원 신청을 통해{' '}
          <b>
            <b>Waitlist</b>
          </b>
          에 등록 하실 수 있습니다.
        </p>
      </div>
      <div className="flex justify-center mb-48">
        <div>
          <button
            className="flex items-center w-72 border-1 border-borderGray rounded-full px-6 py-4 mb-2 text-sm text-white font-bold hover:border-s2condLime "
            onClick={onSocialClick}
            name="google"
          >
            <img src={google} alt="google signup" className="w-6" />
            <p className="mx-auto text-center">Google 계정으로 가입하기</p>
          </button>
          <button
            className="flex items-center w-72 border-1 border-borderGray rounded-full px-6 py-4 mb-2 text-sm text-white font-bold hover:border-s2condLime"
            onClick={onSocialClick}
            name="facebook"
          >
            <img src={facebook} alt="facebook signup" className="w-6" />
            <p className="mx-auto text-center">Facebook 계정으로 가입하기</p>
          </button>
          <Link
            to={{ pathname: '/email', state: { isLogin: false } }}
            className="flex items-center w-72 border-1 border-borderGray rounded-full px-6 py-4 text-sm text-white font-bold hover:border-s2condLime"
          >
            <img src={email} alt="email signup" className="w-6" />
            <p className="mx-auto text-center">이메일로 가입하기</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
