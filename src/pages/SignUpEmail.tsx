import React, { useCallback, useState } from 'react';
import Nav from 'components/Nav';
import styles from 'scss/pages/Landing.module.scss';
import buttons from 'scss/components/Buttons.module.scss';
import signupGun from 'assets/img/signupGun.png';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import signupYes from 'assets/img/signupYes.png';
import signupNo from 'assets/img/signupNo.png';
import checkValid from 'utils/checkValid';
import { SIGNING_UP } from 'constants/userStatus';
import { showToast } from '../store/toast/action';
import { useDispatch } from 'react-redux';
import loginError from '../utils/loginError';

const SignUpEmail = ({ ...state }) => {
  const isLogin = state.location.state.isLogin;
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validity, setValidity] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(true);
  const dispatch = useDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
      setValidity(checkValid(value));
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('clicked!!');

    e.preventDefault();
    //create account
    if (validity) {
      if (isLogin) {
        //로그인 작업 수행
        try {
          await authService
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              console.log(userCredential);
              console.log(userCredential.user?.uid);
              history.push('/lounge');
            });
        } catch (err) {
          console.log(err.code);
          let text = '로그인에 오류가 있습니다.';
          dispatch(showToast(loginError(err.code)));
        }
      } else {
        //회원가입 작업 수행
        try {
          await authService
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              console.log(userCredential);
              console.log(userCredential.user?.uid);
              authService?.currentUser
                ?.sendEmailVerification()
                .then(() => {
                  console.log('Email send Success');
                })
                .catch((err) => {
                  throw new Error(err);
                });
              history.push('/signup/verifyemail');
            });
        } catch (err) {
          dispatch(showToast(loginError(err.code)));
        }
      }
    }
  };
  const onPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPasswordToggle((prev) => !prev);
  };

  return (
    <div className={styles.landingBody}>
      <Nav status={SIGNING_UP} />
      <div className="text-center text-white mt-36 ">
        <div className="mb-48">
          <img
            src={signupGun}
            alt="signup-gun"
            className="w-20 h-auto mx-auto"
          />
          <p className="text-2xl font-bold text-s2condLime">
            {isLogin ? '이메일 로그인' : '이메일 회원가입'}
          </p>
          {/* <p className="font-thin">
          초대장이 없으시면 요원신청을 통해 waitlist에 등록됩니다
        </p> */}
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <input
              name="email"
              type="email"
              placeholder="이메일 주소"
              required
              value={email}
              onChange={onChange}
              className={classnames(
                'border-1 border-textBlack bg-bgBlack text-center font-bold rounded-full h-12 w-96 focus:outline-none focus:border-white mb-2',
                { 'border-white': email },
              )}
            />
            <br />
            <div className="mb-16">
              <input
                name="password"
                type={passwordToggle ? 'password' : 'text'}
                placeholder="비밀번호"
                required
                value={password}
                onChange={onChange}
                pattern="[A-Za-z0-9]*"
                className={classnames(
                  'border-1 border-textBlack bg-bgBlack text-center font-bold rounded-full h-12 w-96 focus:outline-none focus:border-s2condPink',
                  {
                    'border-white focus:border-white': password && validity,
                  },
                )}
              />

              <div className="flex justify-between w-96 mx-auto">
                <p
                  className={classnames('text-xs', {
                    'opacity-0 text-white': !password,
                    'text-s2condPink': !validity,
                  })}
                >
                  소문자, 대문자, 특수문자, 숫자 포함 8자 이상
                </p>
                <button className="flex text-xs" onClick={onPassword}>
                  {passwordToggle ? '비밀번호 보기' : '비밀번호 숨기기'}
                  <img
                    src={passwordToggle ? signupYes : signupNo}
                    alt="show-password-toggle"
                    className="w-3 mt-1 ml-1 focus:outline-none"
                  />
                </button>
              </div>
              <br />
            </div>
            <input
              type="submit"
              value={isLogin ? '로그인 하기' : '설정 완료'}
              className={classnames(
                'border-1 border-textBlack bg-bgBlack text-center rounded-full h-12 w-96 mb-24 font-bold cursor-default focus:outline-none',
                {
                  'border-2 hover:bg-s2condLime hover:text-black cursor-pointer': validity,
                  [buttons.s2condLime]: validity,
                },
              )}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpEmail;
