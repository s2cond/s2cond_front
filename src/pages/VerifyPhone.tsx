import React, { useEffect, useRef, useState } from 'react';
import Nav from 'components/Nav';
import classnames from 'classnames';
import styles from 'scss/pages/Landing.module.scss';
import buttons from 'scss/components/Buttons.module.scss';
import login from 'scss/pages/Login.module.scss';
import starsEyes from 'assets/img/starsEyes.png';
import { authService, firebaseInstance, dbService } from '../fbase';
import phoneAuth from '../utils/phoneAuth';
import AuthTimer from 'components/AuthTimer';
import { useHistory } from 'react-router-dom';
import { SIGNING_UP } from 'constants/userStatus';
import isAvailableNumber from '../utils/isAvailableNumber';
import { AuthCredential } from '@firebase/auth-types';

const VertifyPhone = () => {
  const [phoneNum, setPhoneNum] = useState('');
  const [verifyNum, setVerifyNum] = useState('');
  const [startTime, setStartTime] = useState(false);
  const [verify, setVerify] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaVerifier = (window as any).recaptchaVerifier;
  const user = authService.currentUser;
  let history = useHistory();
  let recaptchaRef = useRef();

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
    let koreanNum =
      '+82' +
      phoneNum.slice(1, 3) +
      phoneNum.slice(4, 8) +
      phoneNum.slice(9, 13);
    let provider = new firebaseInstance.auth.PhoneAuthProvider();

    (window as any).recaptchaVerifier = new firebaseInstance.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
    );
    console.log(koreanNum);
    dbService
      .collection('users')
      .where('phoneNumber', '==', koreanNum)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => console.log(doc.data()));
        if (!querySnapShot.empty) {
          console.log('already Exist', querySnapShot.docs);
        } else {
          console.log('사용가능한 번호입니다.');
          provider
            .verifyPhoneNumber(koreanNum, recaptchaVerifier)
            .then((verificationId) => {
              setVerify(verificationId);
              grecaptcha.reset(recaptchaVerifier);
            })
            .catch((err) => {
              console.log('ERR', err);
              grecaptcha.reset(recaptchaVerifier);
            });
          setStartTime((prev) => !prev);
        }
      });
    //재전송 관련 Issue
  };
  const onNext = () => {
    history.push('/signup/terms');
  };

  const onVerify = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (verifyNum.length < 6 || !verify) return;
    phoneAuth(verify, verifyNum)
      .then((res) => {
        user?.updatePhoneNumber(res!).then(() => {
          setIsVerified(true);
          onNext();
        });

        //재전송을 위한 인증ID 초기화
        setVerify('');
      })
      .catch((err) => {
        console.log('error:', err);
      });
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
      <Nav status={SIGNING_UP} />
      <div className="text-center h-screen pt-36">
        <div className="mb-36">
          <img
            src={starsEyes}
            alt="stars-eyes"
            className="w-20 h-auto mx-auto"
          />
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
                value={phoneNum} //phoneNum
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
              <AuthTimer startTime={startTime} verify={!!verify} />
              <div
                className={classnames(
                  'flex justify-evenly align-middle border-1 border-borderGray rounded-full h-12 w-96',
                  { hidden: !!!verify },
                )}
              >
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
                    {
                      [login.sendBtn]: verifyNum.length > 5 && verify,
                    },
                  )}
                >
                  인증
                </button>
              </div>
            </div>
          </form>
        </div>
        <button
          onClick={onNext}
          className={classnames(
            'border-1 text-textBlack border-textBlack bg-bgBlack text-center rounded-full h-12 w-96 mt-24 font-bold cursor-default focus:outline-none',
            {
              'border-2 hover:bg-s2condLime hover:text-black cursor-pointer': isVerified,
              [buttons.s2condLime]: isVerified,
              hidden: !!!verify,
            },
          )}
        >
          ★요원 신청★
        </button>
      </div>
      <div ref={recaptchaRef.current} id="recaptcha-container"></div>
    </div>
  );
};

export default VertifyPhone;
