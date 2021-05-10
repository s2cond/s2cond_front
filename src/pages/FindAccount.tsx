import React, { useEffect, useRef, useState } from 'react';
import styles from 'scss/pages/Landing.module.scss';
import buttons from 'scss/components/Buttons.module.scss';
import login from 'scss/pages/Login.module.scss';
import classnames from 'classnames';
import findAccount from 'assets/img/findAccount.png';
import Nav from 'components/Nav';
import { LOGGING_IN } from 'constants/userStatus';
import { useHistory } from 'react-router-dom';
import { firebaseInstance, dbService } from 'fbase';
import phoneAuth from 'utils/phoneAuth';
import AuthTimer from 'components/AuthTimer';
import { useDispatch } from 'react-redux';
import { showToast } from 'store/toast/action';
import verifyError from 'utils/verifyError';
import { RecaptchaVerifier } from '@firebase/auth-types';

const FindAccount = () => {
  const [phoneNum, setPhoneNum] = useState('');
  const [verifyNum, setVerifyNum] = useState('');
  const [startTime, setStartTime] = useState(false);
  const [propsInfo, setPropsInfo] = useState('');
  const [verify, setVerify] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaVerifier = (window as any).recaptchaVerifier;
  let history = useHistory();
  const dispatch = useDispatch();
  const recaptchaContainer = useRef(null);
  let provider = new firebaseInstance.auth.PhoneAuthProvider();

  const onTest = () => {
    console.log(recaptchaVerifier);
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
  // const resetcaptcha = () => {
  //   return { __html: '<div id="recaptcha-container" />' };
  // };
  const OnSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (phoneNum.length < 13) return;
    let koreanNum =
      '+82' +
      phoneNum.slice(1, 3) +
      phoneNum.slice(4, 8) +
      phoneNum.slice(9, 13);
    dbService
      .collection('users')
      .where('phoneNumber', '==', koreanNum)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => setPropsInfo(doc.data().email));
        setVerify('loading...');
        if (!querySnapShot.empty) {
          provider
            .verifyPhoneNumber(koreanNum, recaptchaVerifier)
            .then((verificationId) => {
              console.log(recaptchaVerifier);
              setVerify(verificationId);
              dispatch(showToast('코드전송 완료'));
              grecaptcha.reset();
            })
            .catch((err) => {
              console.log('ERR:', err);
              setStartTime((prev) => !prev);
              dispatch(showToast(verifyError(err.code)));
              grecaptcha.reset();
            });
          setStartTime((prev) => !prev);
        } else {
          dispatch(showToast('가입되어있지 않은 번호입니다.'));
        }
      });
  };

  const onVerify = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (verifyNum.length < 6 || !verify) return;
    phoneAuth(verify, verifyNum)
      .then((res) => {
        if (res) {
          setIsVerified(true);
        }
      })
      .catch((err) => {
        dispatch(showToast(verifyError(err.code)));
      });
  };
  const onFindPassword = () => {
    isVerified && history.push('/findpassword', { params: propsInfo });
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
    (window as any).recaptchaVerifier = new firebaseInstance.auth.RecaptchaVerifier(
      recaptchaContainer.current,
      {
        size: 'invisible',
        callback: function () {
          console.log('reset!');
          recaptchaVerifier.reset();
        },
      },
    );
  }, [phoneNum, recaptchaVerifier]);
  return (
    <div className={styles.landingBody}>
      <Nav status={LOGGING_IN} />
      <button onClick={onTest}>buttooooon</button>
      <div className="text-center h-screen pt-36">
        <div className="mb-28">
          <img
            src={findAccount}
            alt="stars-eyes"
            className="w-20 h-auto mx-auto"
          />
          <p className="text-2xl mt-4 text-white">이메일/비밀번호 찾기</p>
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
                onClick={OnSend}
                className={classnames(
                  'bg-bgBlack border-0  font-bold text-sm text-borderGray px-2 focus:outline-none cursor-default',
                  { [login.sendBtn]: phoneNum.length > 12 },
                )}
              >
                {verify ? '재전송' : '전송'}
              </button>
            </div>
            <div>
              <AuthTimer
                startTime={startTime}
                setStartTime={setStartTime}
                verify={!!verify}
              />
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
                    'bg-bgBlack border-0  font-bold text-sm text-borderGray px-2 focus:outline-none cursor-default',
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
          onClick={onFindPassword}
          className={classnames(
            ' border-1 text-textBlack border-textBlack bg-bgBlack text-center rounded-full h-12 w-96 my-24 font-bold cursor-default focus:outline-none',
            {
              'inline-block border-2 hover:bg-s2condYellow hover:text-black cursor-pointer': isVerified,
              [buttons.s2condYellow]: isVerified,
              hidden: !!!verify,
            },
          )}
        >
          이메일 찾기
        </button>
      </div>
      <div ref={recaptchaContainer} />
    </div>
  );
};

export default FindAccount;
