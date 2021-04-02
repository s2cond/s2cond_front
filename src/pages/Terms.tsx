import React, { useState } from 'react';
import Nav from 'components/Nav';
import classnames from 'classnames';
import styles from 'scss/pages/Landing.module.scss';
import buttons from 'scss/components/Buttons.module.scss';
import termsHands from 'assets/img/termsHands.png';
import { useHistory } from 'react-router-dom';
import { SIGNING_UP } from 'constants/userStatus';
import { dbService } from 'fbase';
import { authService } from '../fbase';

const Terms = () => {
  const [isSign, setIsSign] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [isTerms, setIsTerms] = useState(false);
  const [isOverAges, setIsOverAges] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);
  let history = useHistory();
  const user = authService.currentUser;

  const onAll = () => {
    let tmp = isAll;
    setIsAll((prev) => !prev);
    setIsTerms(!tmp);
    setIsOverAges(!tmp);
    setIsMarketing(!tmp);
  };
  const onCompleteSignup = () => {
    console.log(user);
    if (isTerms && isOverAges) {
      user &&
        dbService
          .collection('users')
          .add({
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoUrl: user.photoURL,
            displayName: user.displayName,
            marketing: isMarketing,
            hasInvitation: false,
          })
          .then((docRef) => {
            console.log('User info updated', user);
          })
          .catch((err) => console.log(err));
      history.push('/lounge');
    }
  };
  return (
    <div className={styles.landingBody}>
      <Nav status={SIGNING_UP} />
      <div className="text-center h-screen pt-36">
        <div className="mb-24">
          <img
            src={termsHands}
            alt="signup-gun"
            className="w-20 h-auto mx-auto"
          />
          <p className="text-2xl font-bold text-s2condLime">
            마지막 한 발이 남았어요!
          </p>
          <p className="font-thin text-s2condLime">
            하단의
            <b>
              <b>★요원 신청★</b>
            </b>
            을 눌러 주시면,
            <br />
            s2cond 요원 가입 Waitlist에 올라가요
          </p>
        </div>
        <div className="flex justify-center text-left">
          <div>
            <button
              className="flex items-center text-sm text-white focus:outline-none"
              onClick={onAll}
            >
              <div
                className={classnames('w-3 h-3 border-1 border-white mr-3', {
                  'bg-white': isTerms && isOverAges && isMarketing,
                })}
              />
              <p>모두 동의합니다</p>
            </button>
            <div className="h-0 w-full border-t-1 border-borderGray my-3" />
            <button
              className="flex items-center text-sm text-white mb-3 focus:outline-none"
              onClick={() => setIsTerms((prev) => !prev)}
            >
              <div
                className={classnames('w-3 h-3 border-1 border-white mr-3', {
                  'bg-white': isTerms,
                })}
              />
              <p>[필수] 이용약관 및 개인정보 수집활용에 동의합니다</p>
            </button>
            <button
              className="flex items-center text-sm text-white mb-3 focus:outline-none"
              onClick={() => setIsOverAges((prev) => !prev)}
            >
              <div
                className={classnames('w-3 h-3 border-1 border-white mr-3', {
                  'bg-white': isOverAges,
                })}
              />
              <p>[필수] 만 14세 이상 회원가입에 동의합니다</p>
            </button>
            <button
              className="flex items-center text-sm mb-24 text-white focus:outline-none"
              onClick={() => setIsMarketing((prev) => !prev)}
            >
              <div
                className={classnames('w-3 h-3 border-1 border-white mr-3', {
                  'bg-white': isMarketing,
                })}
              />
              <p>[선택] s2cond의 새로운 소식을 받아보겠습니다</p>
            </button>
          </div>
        </div>
        <button
          onClick={onCompleteSignup}
          className={classnames(
            'border-1 text-textBlack border-textBlack bg-bgBlack text-center rounded-full h-12 w-96 mb-24 font-bold cursor-default focus:outline-none',
            {
              'border-2 cursor-pointer hover:bg-s2condLime hover:text-black':
                isTerms && isOverAges,
              [buttons.s2condLime]: isTerms && isOverAges,
            },
          )}
        >
          ★요원 신청★
        </button>
      </div>
    </div>
  );
};

export default Terms;
