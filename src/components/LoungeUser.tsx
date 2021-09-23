import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Emoji } from 'emoji-mart';
import classnames from 'classnames';
import {
  profileType,
  jobVacanciesConv,
  participationMethodConv,
} from '../constants/profileTypes';
import relative from 'scss/components/relativePosition.module.scss';

type UserDataType = {
  dailyMe: profileType;
  s2condMe: profileType;
  uid?: string;
};
const LoungeUser: React.FC<UserDataType> = (data) => {
  const [isDaily, setIsDaily] = useState(false);
  const { dailyMe, s2condMe, uid } = data;
  const selectedMe = isDaily ? dailyMe : s2condMe;

  return (
    <div className="flex m-5">
      {/* sidebar */}
      <div>
        <button
          className="flex justify-center items-center p-3 border-1 border-s2condMint rounded-l-lg bg-s2condMint "
          onClick={() => setIsDaily(false)}
        >
          <Emoji emoji="sunglasses" set="apple" size={26} />
        </button>
        <button
          className="flex justify-center items-center p-3 border-1 border-s2condLime rounded-l-lg"
          onClick={() => setIsDaily(true)}
        >
          <Emoji emoji="sunglasses" set="apple" size={26} />
        </button>
      </div>
      {/* contents */}
      <Link
        to={{
          pathname: `/profile/${uid}`,
          state: { s2condMe, dailyMe },
        }}
        className="border-6 p-2 border-s2condMint w-72 h-80"
      >
        <div className="flex -mb-5">
          <div
            className={classnames(
              'flex justify-center items-center relative w-32 h-28 bg-black rounded-full',
              relative.minusTop2,
            )}
          >
            <Emoji emoji="sunglasses" set="apple" size={28} />
          </div>
          <div className="ml-2 mt-1">
            <div className="inline-block border-1 border-s2condMint mx-auto p-1 mb-1 text-xs rounded-full text-s2condMint">
              @{jobVacanciesConv(selectedMe.jobVacancies)}
            </div>
            <div className="inline-block border-1 border-s2condMint mx-auto p-1 text-xs rounded-full text-s2condMint">
              @{participationMethodConv(selectedMe.participationMethod)}
            </div>
          </div>
        </div>
        <div className="text-center mb-4 font-bold text-s2condMint">
          {selectedMe.displayName} 요원
        </div>
        <div
          className="flex-nowrap text-white overflow-hidden p-1"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 6,
          }}
        >
          {selectedMe.description}test area
        </div>
      </Link>
    </div>
  );
};

export default LoungeUser;
