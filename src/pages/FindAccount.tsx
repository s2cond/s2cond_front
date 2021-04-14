import React, { useEffect, useRef, useState } from 'react';
import styles from 'scss/pages/Landing.module.scss';
import buttons from 'scss/components/Buttons.module.scss';
import login from 'scss/pages/Login.module.scss';
import classnames from 'classnames';
import findAccount from 'assets/img/findAccount.png';
import Nav from 'components/Nav';
import { LOGGING_IN } from 'constants/userStatus';
import { useHistory } from 'react-router-dom';
import { authService, firebaseInstance, dbService } from 'fbase';
import phoneAuth from 'utils/phoneAuth';
import AuthTimer from 'components/AuthTimer';
import { useDispatch } from 'react-redux';
import { showToast } from 'store/toast/action';
import verifyError from 'utils/verifyError';

const FindAccount = () => {
  const [phoneNum, setPhoneNum] = useState('');
  const [verifyNum, setVerifyNum] = useState('');
  const [startTime, setStartTime] = useState(false);
  const [propsInfo, setPropsInfo] = useState('');
  const [verify, setVerify] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaVerifier = (window as any).recaptchaVerifier;
  const user = authService.currentUser;
  let history = useHistory();
  let recaptchaRef = useRef();
  const dispatch = useDispatch();

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneNum(e.target.value);
    }
  };
  const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyNum(e.target.value);
  };
  const OnSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (phoneNum.length < 13) return;
    let koreanNum =
      '+82' +
      phoneNum.slice(1, 3) +
      phoneNum.slice(4, 8) +
      phoneNum.slice(9, 13);
    let provider = new firebaseInstance.auth.PhoneAuthProvider();

    dbService
      .collection('users')
      .where('phoneNumber', '==', koreanNum)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => setPropsInfo(doc.data().email));
        if (!querySnapShot.empty) {
          provider
            .verifyPhoneNumber(koreanNum, recaptchaVerifier)
            .then((verificationId) => {
              setVerify(verificationId);
              grecaptcha.reset(recaptchaVerifier);
            })
            .catch((err) => {
              dispatch(showToast(verifyError(err.code)));
              grecaptcha.reset(recaptchaVerifier);
            });
          setStartTime((prev) => !prev);
        } else {
          showToast('가입되어있지 않은 번호입니다.');
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
          // user?.updatePhoneNumber();
        }
        //재전송을 위한 인증ID 초기화
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
      'recaptcha-container',
      {
        size: 'invisible',
      },
    );
  }, [phoneNum]);
  return (
    <div className={styles.landingBody}>
      <Nav status={LOGGING_IN} />
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
          onClick={onFindPassword}
          className={classnames(
            ' border-1 text-textBlack border-textBlack bg-bgBlack text-center rounded-full h-12 w-96 mt-24 font-bold cursor-default focus:outline-none',
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
      <div ref={recaptchaRef.current} id="recaptcha-container"></div>
    </div>
  );
};

export default FindAccount;
