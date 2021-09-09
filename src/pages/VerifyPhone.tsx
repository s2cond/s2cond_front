import React, { useEffect, useState } from 'react';
import Nav from 'components/Nav';
import classnames from 'classnames';
import styles from 'scss/pages/Landing.module.scss';
import buttons from 'scss/components/Buttons.module.scss';
import login from 'scss/pages/Login.module.scss';
import starsEyes from 'assets/img/starsEyes.png';
import { authService, firebaseInstance, dbService } from '../fbase';
import phoneAuth from 'utils/phoneAuth';
import AuthTimer from 'components/AuthTimer';
import { useHistory } from 'react-router-dom';
import { SIGNING_UP } from 'constants/userStatus';
import { useDispatch } from 'react-redux';
import { showToast } from 'store/toast/action';
import verifyError from 'utils/verifyError';
import makeNationNum from 'utils/makeNationNum';

const VertifyPhone = () => {
  const storagePhoneNum = window.localStorage.getItem('phoneNumber');
  const [phoneNum, setPhoneNum] = useState(storagePhoneNum || '');
  const [verifyNum, setVerifyNum] = useState('');
  const [startTime, setStartTime] = useState(false);
  const [verify, setVerify] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaVerifier = (window as any).recaptchaVerifier;
  const user = authService.currentUser;
  let history = useHistory();
  const dispatch = useDispatch();

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneNum(e.target.value);
      window.localStorage.setItem('phoneNumber', e.target.value);
    }
  };
  const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyNum(e.target.value);
  };
  const onSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (phoneNum.length < 13) return;
    let koreanNum = makeNationNum(phoneNum, '+82');
    let provider = new firebaseInstance.auth.PhoneAuthProvider();

    dbService
      .collection('users')
      .where('phoneNumber', '==', koreanNum)
      .get()
      .then((querySnapShot) => {
        console.log(querySnapShot.empty);

        querySnapShot.forEach((doc) => console.log(doc.data()));
        if (!querySnapShot.empty) {
          showToast('이미 존재하는 번호입니다.');
        } else {
          setVerify('loading...');
          provider
            .verifyPhoneNumber(koreanNum, recaptchaVerifier)
            .then((verificationId) => {
              setVerify(verificationId);
              dispatch(showToast('코드전송 완료'));
              grecaptcha.reset();
            })
            .catch((err) => {
              dispatch(showToast(verifyError(err.code)));
              grecaptcha.reset();
            });
          setStartTime((prev) => !prev);
        }
      });
    //재전송 관련 Issue
  };
  const onNext = () => {
    history.push('/signup/terms');
    localStorage.removeItem('phoneNumber');
  };

  const onVerify = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const AuthCredential = firebaseInstance.auth.AuthCredential;
    e.preventDefault();
    if (verifyNum.length < 6 || !verify) return;
    phoneAuth(verify, verifyNum)
      // 이 부분 해결해야함 any
      .then((res: any) => {
        res &&
          user?.updatePhoneNumber(res).then(() => {
            setIsVerified(true);
          });
        dbService
          .collection('users')
          .doc(user?.uid)
          .update({ phoneNumber: makeNationNum(phoneNum, '+82') })
          .then(() => console.log('db에 pn update'))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        dispatch(showToast(verifyError(err.code)));
      });
  };

  useEffect(() => {
    (window as any).recaptchaVerifier =
      new firebaseInstance.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
      });

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
            'border-1 text-textBlack border-textBlack bg-bgBlack text-center rounded-full h-12 w-96 my-24 font-bold cursor-default focus:outline-none',
            {
              'border-2 hover:bg-s2condLime hover:text-black cursor-pointer':
                isVerified,
              [buttons.s2condLime]: isVerified,
              hidden: !!!verify,
            },
          )}
        >
          ★요원 신청★
        </button>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default VertifyPhone;
