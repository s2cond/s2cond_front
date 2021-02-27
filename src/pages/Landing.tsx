import React from 'react';
import styles from 'scss/pages/Landing.module.scss';
import fireImg from 'assets/img/fire.png';
import victoryHandImg from 'assets/img/victoryHand.png';
import backhandImg from 'assets/img/backhand.png';
import crystalballImg from 'assets/img/crystalball.png';
import { life } from 'constants/interests';
import InterestsList from '../components/InterestsList';

const Landing = () => {
  return (
    <div className={styles.landingBody}>
      <div className="mt-48 md:mt-36 mx-56 md:mx-40 text-2xl mb-16">
        <div className="font-light mb-24">
          <div className="flex items-center mb-12">
            <img
              src={victoryHandImg}
              className="h-15 mr-24"
              alt="victoryHand"
            />
            <p className="text-white">
              요즘같은
              <b>
                <b>부캐 시대</b>
              </b>
              , <br />
              다들
              <b>
                <b>세컨드</b>
              </b>
              하나쯤은 있잖아요?
            </p>
          </div>
          <div className="flex items-center">
            <img src={fireImg} className="h-15 mr-24" alt="victoryHand" />
            <p className="text-white">
              금같은 시간, <br />
              <b>
                <b>사이드 허슬 프로젝트</b>
              </b>
              에
              <br /> 참여해 보세요!
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <p className="text-white text-sm mb-2">
              ~~~~~요원 신청 마저 완료하기~~~~~
            </p>
            <div className="flex justify-center">
              <img src={backhandImg} alt="backhand" className="w-6" />
              <img src={backhandImg} alt="backhand" className="w-6" />
              <img src={backhandImg} alt="backhand" className="w-6" />
            </div>
          </div>
        </div>
      </div>
      <hr className="w-max mx-56 md:mx-40 border-b-1 border-textBlack border-dashed" />
      <div className="mx-56 md:mx-40">
        <div className="flex items-center my-20 font-light text-s2condPurple">
          <img src={crystalballImg} alt="crystalBall" className="h-15 mr-24" />
          <p className="text-2xl">
            어떤 취향이에요?
            <br />
            여러분의
            <b>
              <b>관심사</b>
            </b>
            가 궁금해요!
          </p>
        </div>
        <div>
          <InterestsList {...life} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
