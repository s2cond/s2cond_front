import React, { useEffect, useState } from 'react';
import { interestType, interestsType } from 'constants/interests';
import classnames from 'classnames';
import { Emoji } from 'emoji-mart';
import { emoji } from 'assets/emoji';

type colorListType = {
  [key: string]: string;
};
type selectedInterestType = {
  [category: string]: string[];
};
type landingProops = {
  data: interestsType;
  selectedInterest: selectedInterestType;
  setSelectedInterest: React.Dispatch<
    React.SetStateAction<selectedInterestType>
  >;
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
  category: string;
  selectedInterest: Object;
  setSelectedInterest: React.Dispatch<React.SetStateAction<{}>>;
};

const InterestBtn = ({
  category,
  keyValue,
  value,
  color,
  selectedInterest,
  setSelectedInterest,
}: Props) => {
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
const InterestsList: React.FC<landingProops> = ({
  data,
  selectedInterest,
  setSelectedInterest,
}) => {
  const { [data.name.en.toLowerCase()]: colorValue } = colorList;

  const onInterestClick = (keyValue: string, category: string) => {
    const prevInterest = selectedInterest;
    if (prevInterest[category]?.includes(keyValue)) {
      let index = prevInterest[category].indexOf(keyValue);
      prevInterest[category].splice(index, 1);
    } else {
      prevInterest[category].push(keyValue);
    }
    setSelectedInterest(prevInterest);
    console.log(selectedInterest);
  };
  useEffect(() => {
    console.log(selectedInterest);
  }, [selectedInterest]);

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
                <div onClick={() => onInterestClick(key, data.name.en)} key={i}>
                  <InterestBtn
                    category={data.name.en}
                    keyValue={key}
                    value={value}
                    color={colorValue}
                    selectedInterest={selectedInterest}
                    setSelectedInterest={setSelectedInterest}
                    key={i}
                  />
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default InterestsList;
