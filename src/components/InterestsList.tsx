import React, { useState } from 'react';
import { interestType, interestsType } from 'constants/interests';
import classnames from 'classnames';
import { interestImg } from '../assets/img/index';
import { interest } from '../constants/interests';

type colorListType = {
  [key: string]: string;
};
const colorList: colorListType = {
  life: 'white',
  identity: 's2condPurple',
  arts: 's2condPink',
  industry: 's2condOrange',
  knowledge: 's2condYellow',
  sports: 's2condLime',
  languages: 's2condMint',
};

type Props = {
  keyValue: string;
  value: interestType;
  color: string;
};

const InterestBtn = ({ keyValue, value, color }: Props) => {
  const [clicked, setClicked] = useState(false);
  const onInterestClick = () => {
    setClicked(!clicked);
  };
  return (
    <button
      onClick={onInterestClick}
      className={classnames(
        `float-left flex justify-center align-middle h-8  border-1 border-textBlack rounded-full pt-1 px-4 mx-1 mb-2  hover:border-${color} active:border-${color}`,
        { [`border-${color}`]: clicked },
      )}
    >
      <p className="text-white text-base">{value.kr}</p>
    </button>
  );
};
const InterestsList = ({ ...data }: interestsType) => {
  const { [data.name.en.toLowerCase()]: colorValue } = colorList;

  return (
    <div className="mb-10 flex items-start">
      <div
        className={`flex justify-items-start p-auto w-48 pb-1 text-2xl font-bold text-${colorValue}`}
      >
        <p className={`border-b-12 border-${colorValue}`}>{data.name.kr}</p>
      </div>
      <div className="inline-block">
        {Object.entries(data).map(([key, value], i) => {
          return i > 0 ? (
            <InterestBtn
              keyValue={key}
              value={value}
              color={colorValue}
              key={i}
            />
          ) : null;
        })}
      </div>
      <div>
        <button></button>
      </div>
    </div>
  );
};

export default InterestsList;
