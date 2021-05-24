import React, { useState } from 'react';
import Nav from 'components/Nav';
import styles from 'scss/pages/Landing.module.scss';
import { Link, useHistory } from 'react-router-dom';
import fireImg from 'assets/img/fire.png';
import victoryHandImg from 'assets/img/victoryHand.png';
import crystalballImg from 'assets/img/crystalball.png';
import { interest } from 'constants/interests';
import InterestsList from '../components/InterestsList';
import millennials from 'assets/img/millennials.png';
import { NONE } from '../constants/userStatus';
import { Emoji } from 'emoji-mart';
import { useDispatch } from 'react-redux';
import { updateInterest } from '../store/auth/action';

type selectedInterestType = {
  [category: string]: string[];
};
const interestInit = {
  Life: [],
  Identity: [],
  Arts: [],
  Industry: [],
  Knowledge: [],
  Sports: [],
  Languages: [],
};

const Landing = () => {
  const [selectedInterest, setSelectedInterest] =
    useState<selectedInterestType>(interestInit);
  const history = useHistory();
  const dispatch = useDispatch();
  const onEnroll = () => {
    //selectedInterest를 Redux로 보내기
    dispatch(updateInterest(selectedInterest));
    history.push('/signup');
  };
  return (
    <div className={styles.landingBody}>
      <Nav status={NONE} />
      <div className="mt-48 md:mt-36 mx-56 md:mx-40 text-2xl mb-16">
        <div className="font-light mb-24">
          <div className="grid grid-cols-6 mb-3">
            <img
              src={victoryHandImg}
              className="col-span-1 h-15 mr-24"
              alt="victoryHand"
            />
            <p className="col-span-4 text-white">
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
            <div className="col-span-1">
              <div className="flex items-center border-6 border-textBlack text-sm p-1 mb-3">
                <span className="flex ml-1">
                  <Emoji emoji={'name_badge'} size={18} />
                </span>
                <input
                  type="text"
                  placeholder="본캐 이름"
                  className="bg-bgBlack h-4 ml-3 w-24 text-white focus:outline-none focus:border-transparent"
                />
              </div>
              <div className="flex items-center border-6 border-textBlack text-sm p-1">
                <span className="flex ml-1">
                  <Emoji emoji={'black_joker'} size={18} />
                </span>
                <select className="bg-bgBlack ml-2 w-30 text-white border-0 outline-none">
                  <option value="" disabled>
                    본캐 상태
                  </option>
                  <option>구인 중</option>
                  <option>이직 준비 중</option>
                  <option>프로 N잡러</option>
                  <option>해당 사항 없음</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <img
              src={fireImg}
              className="col-span-1 h-15 mr-24"
              alt="victoryHand"
            />
            <p className="col-span-4 text-white">
              금같은 시간, <br />
              <b>
                <b>사이드 허슬 프로젝트</b>
              </b>
              에
              <br /> 참여해 보세요!
            </p>
            <div className="col-span-1">
              <div className="flex items-center border-6 border-textBlack text-sm p-1 mb-3">
                <span className="flex ml-1">
                  <Emoji emoji={'clock12'} size={18} />
                </span>
                <select className="bg-bgBlack ml-2 w-30 text-white border-0 outline-none">
                  <option value="" disabled>
                    투자시간 /주&nbsp;&nbsp;&nbsp;
                  </option>
                  <option>1 ~ 5시간</option>
                  <option>6 ~ 10시간</option>
                  <option>11 ~ 15시간</option>
                  <option>16 ~ 20시간</option>
                  <option>21시간 이상</option>
                </select>
              </div>
              <div className="flex align-middle border-6 border-textBlack text-sm p-1">
                <span className="flex ml-1">
                  <Emoji emoji={'computer'} size={18} />
                </span>
                <select className="bg-bgBlack ml-2 w-30 text-white border-0 outline-none">
                  <option value="" disabled>
                    선호 참여 방식
                  </option>
                  <option>자율 출퇴근</option>
                  <option>대면</option>
                  <option>비대면</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <p className="text-white text-sm mb-2">요원 신청 마저 하기</p>
            <div className="flex justify-center">
              <Emoji emoji={'point_down'} size={28} />
              <Emoji emoji={'point_down'} size={28} />
              <Emoji emoji={'point_down'} size={28} />
            </div>
          </div>
        </div>
      </div>
      <hr className="w-max mx-56 md:mx-40 border-b-1 border-textBlack border-dashed" />
      <div className="mx-56 md:mx-40">
        <div className="grid grid-cols-6 my-20 font-light text-s2condPurple">
          <img
            src={crystalballImg}
            alt="crystalBall"
            className="col-span-1 h-15"
          />
          <p className="text-2xl col-span-5">
            어떤 취향이에요?
            <br />
            여러분의{' '}
            <b>
              <b>관심사</b>
            </b>
            가 궁금해요!
          </p>
        </div>
        <div>
          {interest.map((data, i) => {
            return (
              <div key={i}>
                <InterestsList
                  selectedInterest={selectedInterest}
                  setSelectedInterest={setSelectedInterest}
                  data={data}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-16 mb-24">
          <button
            onClick={onEnroll}
            className="group flex items-center justify-center border-1 border-s2condPink rounded-full px-16 py-6 hover:bg-s2condPink focus:outline-none"
          >
            <div className="flex">
              <img src={millennials} alt="apply" className="h-5 mt-1" />
              <p className="text-lg text-s2condPink font-bold ml-2 group-hover:text-white">
                요원 신청하기
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
