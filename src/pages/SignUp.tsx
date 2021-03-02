import React from 'react';
import styles from 'scss/pages/Landing.module.scss';
import signupGun from 'assets/img/signupGun.png';
import google from 'assets/img/google.png';
import facebook from 'assets/img/facebook.png';
import email from 'assets/img/email.png';
import { Link } from 'react-router-dom';
import { authService, firebaseInstance } from 'fbase';
import { AuthProvider } from '@firebase/auth-types';

const SignUp = () => {
  const onSocialClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const name = (event.target as HTMLButtonElement).name;
    console.log(name);

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
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(user);
  };
  return (
    <div className={styles.landingBody}>
      <div className="text-center text-s2condLime mt-36 mb-24">
        <img src={signupGun} alt="signup-gun" className="mx-auto" />
        <p className="text-lg font-bold">s2cond 요원 ID를 설정해 주세요!</p>
        <p className="font-thin">
          초대장이 없으시면 요원신청을 통해 waitlist에 등록됩니다
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
            <p className="mx-auto text-center">Signup with Google</p>
          </button>
          <button
            className="flex items-center w-72 border-1 border-borderGray rounded-full px-6 py-4 mb-2 text-sm text-white font-bold hover:border-s2condLime"
            onClick={onSocialClick}
            name="facebook"
          >
            <img src={facebook} alt="facebook signup" className="w-6" />
            <p className="mx-auto text-center">Signup with Facebook</p>
          </button>
          <Link
            to="signup/email"
            className="flex items-center w-72 border-1 border-borderGray rounded-full px-6 py-4 text-sm text-white font-bold hover:border-s2condLime"
          >
            <img src={email} alt="email signup" className="w-6" />
            <p className="mx-auto text-center">Email Google</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
