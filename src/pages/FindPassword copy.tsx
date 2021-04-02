import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import styles from 'scss/pages/Landing.module.scss';
import buttons from 'scss/components/Buttons.module.scss';
import Nav from 'components/Nav';
import { LOGGING_IN } from 'constants/userStatus';
import checkValid from 'utils/checkValid';
import findPassword from 'assets/img/findPassword.png';
import signupYes from 'assets/img/signupYes.png';
import signupNo from 'assets/img/signupNo.png';
import { authService } from 'fbase';

const FindPassword = () => {
  const location = useLocation();
  const myparam = location.state.params;
  const [findPW, setFindPW] = useState(false);
  const [password, setPassword] = useState('');
  const [validity, setValidity] = useState(false);
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordToggle, setPasswordToggle] = useState(true);

  const onFindPassword = () => {
    !findPW && setFindPW((prev) => !prev);
  };
  const onPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPasswordToggle((prev) => !prev);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    name === 'password' ? setPassword(value) : setCheckPassword(value);

    setValidity(checkValid(value));
  };
  const setNewPassword = () => {
    if (checkPassword === password && validity) {
      //SDK 연결하면 여기서 바꿀 수 있음!
    }
  };

  return (
    <div className={styles.landingBody}>
      <Nav status={LOGGING_IN} />
      <div className="flex flex-col space-y-36 text-center h-screen pt-36">
        <div className="">
          <img
            src={findPassword}
            alt="stars-eyes"
            className="w-20 h-auto mx-auto"
          />
          <p className="text-2xl mt-4 text-white">
            {findPW ? '비밀번호 재설정' : '이메일/비밀번호 찾기'}
          </p>
        </div>
        <div className="flex justify-center text-white">
          {!findPW && <p>{myparam}</p>}
          {findPW && (
            <div>
              <input
                name="password"
                type={passwordToggle ? 'password' : 'text'}
                placeholder="비밀번호"
                required
                value={password}
                onChange={onPasswordChange}
                pattern="[A-Za-z0-9]*"
                className={classnames(
                  'border-1 border-textBlack bg-bgBlack text-center font-bold rounded-full h-12 w-96 focus:outline-none focus:border-white',
                  {
                    'border-white focus:border-s2condYellow':
                      password && validity,
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
              <input
                name="checkPassword"
                type={passwordToggle ? 'password' : 'text'}
                placeholder="비밀번호 확인"
                required
                value={checkPassword}
                onChange={onPasswordChange}
                pattern="[A-Za-z0-9]*"
                className={classnames(
                  'border-1 border-textBlack bg-bgBlack text-center font-bold rounded-full h-12 w-96 focus:outline-none focus:border-white',
                  {
                    'border-white focus:border-s2condYellow':
                      checkPassword !== '' && checkPassword === password,
                  },
                )}
              />
            </div>
          )}
        </div>
        <div>
          <button
            onClick={onFindPassword}
            className="border-1 text-textBlack border-s2condYellow bg-s2condYellow text-center rounded-full h-12 w-96  font-bold cursor-pointer focus:outline-none"
          >
            새로운 비밀번호 지정하기
          </button>
          <button
            onClick={setNewPassword}
            className={classnames(
              'border-1 border-textBlack text-text bg-bgBlack text-center rounded-full h-12 w-96 mb-24 font-bold cursor-default focus:outline-none',
              {
                'border-2 hover:bg-s2condLime hover:text-black cursor-pointer': validity,
                [buttons.s2condYellow]: checkPassword === password && validity,
              },
            )}
          >
            변경 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
