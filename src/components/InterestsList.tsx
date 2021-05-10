import React, { useState } from 'react';
import { interestType, interestsType } from 'constants/interests';
import classnames from 'classnames';
import { interestImg } from '../assets/img/index';
import { Emoji } from 'emoji-mart';
import { emoji } from 'assets/emoji';

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
  // const { [keyValue]: imgSrc } = interestImg;
  const imgSrc = emoji[keyValue];
  const onInterestClick = () => {
    setClicked(!clicked);
  };
  return (
    <button
      onClick={onInterestClick}
      className={classnames(
        `float-left flex justify-center align-middle h-8 border-1 rounded-full pt-1 px-4 mx-1 mb-2 focus:outline-none hover:border-${color} active:border-${color}`,
        { [`border-${color}`]: clicked, 'border-textBlack': !clicked },
      )}
    >
      <span className="mr-1">
        <Emoji emoji={imgSrc} size={13} />
      </span>
      <p className="text-white text-base font-thin">{value.kr}</p>
    </button>
  );
};
const InterestsList: React.FC<interestsType> = ({ ...data }) => {
  const { [data.name.en.toLowerCase()]: colorValue } = colorList;

  return (
    <>
      <div className="mb-8 flex items-start">
        <div className="grid grid-cols-6 w-full">
          <div
            className={` flex justify-items-start p-auto text-2xl font-bold text-${colorValue}`}
          >
            <p className={`h-12 border-b-12 border-${colorValue}`}>
              {data.name.kr}
            </p>
          </div>
          <div className="col-span-5 ">
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
        </div>
      </div>
      <div>
        <button></button>
      </div>
    </>
  );
};

export default InterestsList;
