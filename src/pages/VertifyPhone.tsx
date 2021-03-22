import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from 'scss/pages/Landing.module.scss';
import login from 'scss/pages/Login.module.scss';
import starsEyes from 'assets/img/starsEyes.png';
import { authService, firebaseInstance } from '../fbase';
import { ConfirmationResult } from '@firebase/auth-types';

const VertifyPhone = () => {
  const [phoneNum, setPhoneNum] = useState('');
  const [verifyNum, setVerifyNum] = useState('');
  const [time, setTime] = useState('2:00');
  const [verify, setVerify] = useState<ConfirmationResult>();

  let recaptchaRef = useRef();
  const setTimer = (time: number) => {
    let min;
    let sec;
    setInterval(() => {
      min = Math.floor(time / 60);
      sec = time % 60 ? time % 60 : '00';
      setTime(`${min}:${sec}`);
      time--;
      if (!time) {
        (window as any).clearInterval(setTimer);
        console.log('시간초과');
      }
    }, 1000);
  };
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneNum(e.target.value);
    }
  };
  const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyNum(e.target.value);
  };
  const onSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (phoneNum.length < 13) return;
    let koreanNum = '+82' + phoneNum.slice(1);

    (window as any).recaptchaVerifier = new firebaseInstance.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
    );
    const recaptchaVerifier = (window as any).recaptchaVerifier;
    authService
      .signInWithPhoneNumber(koreanNum, recaptchaVerifier)
      .then((e) => {
        setVerify(e);
        // e.confirm(verifyNum)
        //   .then((res) => {
        //     console.log(res.user, 'user');
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      })
      .catch((err) => console.log('ERR', err));
    //시간초
    setTimer(120);
  };

  const onVerify = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (verifyNum.length < 6) return;
    console.log(111);
    verify &&
      verify
        .confirm(verifyNum)
        .then((res) => {
          console.log(res.user, 'user');
        })
        .catch((err) => {
          console.log(err);
        });
    console.log(verifyNum);
    console.log(e);
  };

  useEffect(() => {
    if (phoneNum.length === 10) {
      setPhoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNum.length === 13) {
      setPhoneNum(
        phoneNum.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [phoneNum]);

  return (
    <div className={styles.landingBody}>
      <div className="text-center mt-36 ">
        <div className="mb-48">
          <img src={starsEyes} alt="stars-eyes" className="mx-auto" />
          <p className="text-2xl font-bold text-s2condLime">
            혹시 전화번호가 어떻게 되나요?
          </p>
          <p className="font-thin text-s2condLime">
            초대장이 없으시면 요원신청을 통해 waitlist에 등록됩니다
          </p>
        </div>
        <div className="flex justify-center">
          <form>
            <div className="flex justify-evenly align-middle border-1 border-borderGray rounded-full h-12 w-96">
              <input
                type="text"
                placeholder="인증 받을 전화번호를 입력해주세요"
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                maxLength={13}
                onChange={handleNumberChange}
                value={phoneNum}
                className="bg-bgBlack border-0 placeholder-borderGray font-bold text-sm w-56  focus:outline-none text-white"
              />
              <div className="border-r-1 border-borderGray w-0 h-7 my-auto" />
              <button
                onClick={onSend}
                className={classnames(
                  'bg-bgBlack border-0  font-bold text-sm text-borderGray cursor-pointer px-2 focus:outline-none',
                  { [login.sendBtn]: phoneNum.length > 12 },
                )}
              >
                {verify ? '재전송' : '전송'}
              </button>
            </div>
            <div>
              <p className="text-xs text-white font-light">
                인증 잔여 시간 {time}
              </p>
              <div className="flex justify-evenly align-middle border-1 border-borderGray rounded-full h-12 w-96">
                <input
                  type="text"
                  placeholder="인증 번호를 입력하세요"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  minLength={6}
                  onChange={handleVerifyChange}
                  value={verifyNum}
                  className="bg-bgBlack border-0 placeholder-borderGray font-bold text-sm w-56  focus:outline-none text-white"
                />
                <div className="border-r-1 border-borderGray w-0 h-7 my-auto" />
                <button
                  onClick={onVerify}
                  className={classnames(
                    'bg-bgBlack border-0  font-bold text-sm text-borderGray cursor-pointer px-2 focus:outline-none',
                    { [login.sendBtn]: verifyNum.length > 5 },
                  )}
                >
                  인증
                </button>
              </div>
              <div ref={recaptchaRef.current} id="recaptcha-container"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VertifyPhone;
