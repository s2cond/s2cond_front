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
import AuthTimer from 'components/AuthTimer';
import { useDispatch } from 'react-redux';
import { showToast } from 'store/toast/action';
import verifyError from 'utils/verifyError';
import makeNationNum from 'utils/makeNationNum';

const FindAccount = () => {
  const storagePhoneNum = window.localStorage.getItem('phoneNumber');
  const verifyButton = useRef<HTMLButtonElement>(null);
  const [phoneNum, setPhoneNum] = useState(storagePhoneNum || '');
  const [inputNum, setInputNum] = useState('');
  const [verifyNum, setVerifyNum] = useState('');
  const [startTime, setStartTime] = useState(false);
  const [propsInfo, setPropsInfo] = useState('');
  const [verify, setVerify] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [codeInput, setCodeInput] = useState(false);
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
      window.localStorage.setItem('phoneNumber', e.target.value);
    }
  };
  const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNum(e.target.value);
  };

  const waitListener = async (
    Element: React.RefObject<HTMLButtonElement>,
    ListenerName: keyof HTMLElementEventMap,
  ) => {
    return new Promise(function (resolve, reject) {
      const listener = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      ) => {
        // Element?.current?.removeEventListener(ListenerName, listener);
        console.log(Element, ListenerName);
        resolve(event);
      };
      // Element.addEventListener(ListenerName, listener);
    });
  };

  const OnSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (phoneNum.length < 13) return;
    let nationNum = makeNationNum(phoneNum, '+82');
    dbService
      .collection('users')
      .where('phoneNumber', '==', nationNum)
      .get()
      .then((querySnapShot) => {
        setCodeInput(true);
        querySnapShot.forEach((doc) => {
          setPropsInfo(doc.data().email);
        });
        //user 없을시에
        if (querySnapShot.empty) {
          throw new Error('already-exists');
        }
        //인증 발송
        console.log('인증버튼 클릭');
        return provider.verifyPhoneNumber(nationNum, recaptchaVerifier);
      })
      .then((verificationId) => {
        console.log('코드전송완료');
        dispatch(showToast('코드전송 완료'));
        setVerify(verificationId);
        console.log(verifyNum)
          console.log(verifyNum)
          return new Promise(function(res,rej){
            console.log('Promise passed')
            if(verifyNum){res("button clicked")} 
          })
      })
      .then(() => {
        console.log('verify process start')
        return firebaseInstance.auth.PhoneAuthProvider.credential(
            verify,
            verifyNum,
          );
      })
      .then((phoneCredential) => {
        console.log('인증 성공');
        console.log(phoneCredential);
        dispatch(showToast('인증 완료'));
        //다음 단계 버튼 활성화
        setIsVerified(true);
      })
      .catch((err) => {
        console.log('ver4');

        console.log('ERR:', err);
        setStartTime((prev) => !prev);
        dispatch(showToast(verifyError(err.code)));
        //새로고침으로 임시방편
        window.location.reload();
      });
    // if (!querySnapShot.empty) {
    //   setCodeInput(true);
    //   provider
    //     .verifyPhoneNumber(nationNum, recaptchaVerifier)
    //     .then((verificationId) => {
    //       setVerify(verificationId);
    //       dispatch(showToast('코드전송 완료'));
    //       return new Promise((res, rej) => {
    //         (function waitOTP() {
    //           console.log('verifyNum', verifyNum);
    //           if (verifyNum) {
    //             console.log('verified');
    //             return firebaseInstance.auth.PhoneAuthProvider.credential(
    //               verify,
    //               verifyNum,
    //             );
    //           }
    //           setTimeout(waitOTP, 300);
    //         })();
    //       })
    //         .then((res) => {
    //           setIsVerified(true);
    //           console.log('verified', res);
    //         })
    //         .catch((err) => console.log(err));
    //       //async로 getOTPNumber 실행, 함수 내에서 OTP를 가져오게 되면 리턴해서 함수 실행
    //       // getOTPNumber().then(() => {
    //       //   return firebaseInstance.auth.PhoneAuthProvider.credential(
    //       //     verify,
    //       //     verifyNum,
    //       //   );
    //       // });
    //     })
    //     .catch((err) => {
    //       console.log('ERR:', err);
    //       setStartTime((prev) => !prev);
    //       dispatch(showToast(verifyError(err.code)));
    //       //새로고침으로 임시방편
    //       window.location.reload();
    //     });
    //   setStartTime((prev) => !prev);
    // } else {
    //   dispatch(showToast('가입되어있지 않은 번호입니다.'));
    // }
  };

  const onVerify = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (inputNum.length === 6) {
      setVerifyNum(inputNum);
    }
    //리턴값으로 이 크레덴셜을 가져와야함!!!

    // if (verifyNum.length < 6 || !verify) return;
    // phoneAuth(verify, verifyNum)
    //   .then((res) => {
    //     console.log('phoneVerify result: ', res);
    //     if (res) {
    //       console.log(isVerified);
    //       setIsVerified(true);
    //     }
    //   })
    //   .catch((err) => {
    //     dispatch(showToast(verifyError(err.code)));
    //     //새로고침으로 임시방편
    //     window.location.reload();
    //   });
  };
  const onFindPassword = () => {
    if (isVerified) {
      history.push('/findpassword', { params: propsInfo });
      localStorage.removeItem('phoneNumber');
    }
  };

  useEffect(() => {
    (window as any).recaptchaVerifier =
      new firebaseInstance.auth.RecaptchaVerifier(recaptchaContainer.current, {
        size: 'invisible',
      });
  }, []);
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
  useEffect(() => {}, [verifyNum]);
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
                verify={!!codeInput}
              />
              <div
                className={classnames(
                  'flex justify-evenly align-middle border-1 border-borderGray rounded-full h-12 w-96',
                  { hidden: !!!codeInput },
                )}
              >
                <input
                  type="text"
                  placeholder="인증 번호를 입력하세요"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  minLength={6}
                  onChange={handleVerifyChange}
                  value={inputNum}
                  className="bg-bgBlack border-0 placeholder-borderGray font-bold text-sm w-56  focus:outline-none text-white"
                />
                <div className="border-r-1 border-borderGray w-0 h-7 my-auto" />
                <button
                  onClick={onVerify}
                  ref={verifyButton}
                  className={classnames(
                    'bg-bgBlack border-0  font-bold text-sm text-borderGray px-2 focus:outline-none cursor-default',
                    {
                      [login.sendBtn]: inputNum.length > 5 && codeInput,
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
              'inline-block border-2 hover:bg-s2condYellow hover:text-black cursor-pointer':
                isVerified,
              [buttons.s2condYellow]: isVerified,
              hidden: !!!codeInput,
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
