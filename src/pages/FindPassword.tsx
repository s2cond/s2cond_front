import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from 'scss/pages/Landing.module.scss';
import Nav from 'components/Nav';
import { LOGGING_IN } from 'constants/userStatus';
import findPassword from 'assets/img/findPassword.png';
import { authService } from '../fbase';

const FindPassword = () => {
  const location = useLocation();
  const myparam = location.state.params;
  const [findPW, setFindPW] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const onFindPassword = () => {
    !findPW && setFindPW((prev) => !prev);
    findPW &&
      authService
        .sendPasswordResetEmail(myparam)
        .then(() => {
          setIsSend(true);
        })
        .then((err) => console.log(err));
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
          <p className="text-2xl mt-4 text-white">이메일/비밀번호 찾기</p>
        </div>
        <div className="flex justify-center text-sm text-white">
          <p>
            {findPW ? (
              isSend ? (
                '여러분의 이메일로 비밀번호 변경 링크를 전송해 드렸어요!'
              ) : (
                '이메일로 비밀번호 변경 링크를 보내드립니다.'
              )
            ) : (
              <u>{myparam}</u>
            )}
          </p>
        </div>
        <div>
          <button
            onClick={onFindPassword}
            className="border-1 text-textBlack border-s2condYellow bg-s2condYellow text-center rounded-full h-12 w-96  font-bold cursor-pointer focus:outline-none"
          >
            {findPW ? '이메일 보내기' : '새로운 비밀번호 지정하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
