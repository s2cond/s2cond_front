import React, { useState } from 'react';
import Nav from 'components/Nav';
import classnames from 'classnames';
import styles from 'scss/pages/Landing.module.scss';
import termsHands from 'assets/img/termsHands.png';
import { useHistory } from 'react-router-dom';
import { SIGNING_UP } from 'constants/userStatus';

const Terms = () => {
  const [isSign, setIsSign] = useState(false);
  let history = useHistory();

  const onSign = () => {
    setIsSign((prev) => !prev);
  };
  const onCompleteSignup = () => {
    isSign && history.push('/lounge');
  };
  return (
    <div className={styles.landingBody}>
      <Nav status={SIGNING_UP} />
      <div className="text-center h-screen pt-36">
        <div className="mb-28">
          <img src={termsHands} alt="signup-gun" className="mx-auto" />
          <p className="text-2xl font-bold text-s2condLime">
            마지막 한 발이 남았어요!
          </p>
          <p className="font-thin text-s2condLime">
            하단의{' '}
            <b>
              <b>★요원 신청★</b>
            </b>{' '}
            을 눌러 주시면,
            <br />
            s2cond 요원 가입 Waitlist에 올라가요
          </p>
        </div>
        <div>
          <button className="text-white" onClick={onSign}>
            이용약관에 동의합니다
            <div
              className={classnames(
                'border-1 border-textBlack hover:border-white h-3 outline-none focus:outline-none mb-48',
                {
                  'bg-white border-white': isSign,
                },
              )}
            />
          </button>
        </div>
        <button
          onClick={onCompleteSignup}
          className={classnames(
            'border-1 text-textBlack border-textBlack bg-bgBlack text-center rounded-full h-12 w-96 mb-24 font-bold focus:outline-none',
            {
              'border-2 border-s2condLime text-s2condLime hover:bg-s2condLime hover:text-black': !isSign,
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
