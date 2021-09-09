import React from 'react';
import Nav from 'components/Nav';
import styles from 'scss/pages/Landing.module.scss';
import { authService } from '../fbase';
import { MEMBER } from 'constants/userStatus';
import { Emoji } from 'emoji-mart';
import classnames from 'classnames';
import SocialBtn from 'components/SocialBtn';

const Profile = () => {
  // uid가 링크와 같으면 mypage로 redirect
  const user = authService.currentUser;

  console.log(user);
  return (
    <div className={classnames('h-screen', styles.landingBody)}>
      <Nav status={MEMBER} />
      <div className="flex justify-center h-2/3 align-middle mt-24 mx-56">
        {/* sidebar */}
        <div className="w-40">
          <div className="flex justify-start align-middle p-1 pl-2 border-8 border-borderGray">
            <div>
              <Emoji emoji="santa" set="apple" size={16} />
            </div>
            <p className="text-borderGray font-bold ml-1">S2cond Me</p>
          </div>
          <div className="flex justify-start align-middle p-1 pl-2 border-8 border-textBlack">
            <div>
              <Emoji emoji="santa" set="apple" size={16} />
            </div>
            <p className="text-borderGray ml-1">Daily Me</p>
          </div>
        </div>
        {/* profile contents */}
        <div className="w-full h-full">
          <div className="w-full border-8 border-borderGray overflow-visible ">
            <div className="flex justify-start align-middle overflow-visible z-10 -mb-6">
              {/* Profile Info */}
              <div className="ml-5 mr-12">
                <div
                  className={classnames(
                    'flex justify-center align-middle z-20 relative rounded-full bg-black p-10',
                    styles.minusTop,
                  )}
                >
                  <Emoji emoji="santa" set="apple" size={43} />
                </div>
                <div
                  className={classnames(
                    'flex justify-center align-middle z-20 relative ml-15 w-15 h-15 rounded-full bg-black p-4 border-white border-2',
                    styles.minusTopSmall,
                  )}
                >
                  <Emoji emoji="santa" set="apple" size={24} />
                </div>
              </div>
              <div>
                <div className="flex mt-6">
                  <div className="text-center text-xs text-white border-white border-1 py-1 px-2 mr-1 rounded-full">
                    @구인상태
                  </div>
                  <div className="text-center text-xs text-white border-white border-1 py-1 px-2 rounded-full">
                    @선호참여방식
                  </div>
                </div>
                <div className="text-white font-bold my-3">
                  {user?.displayName} 요원
                </div>
                <div>
                  <SocialBtn />
                </div>
              </div>
            </div>
            <div>{/* Profile description */}</div>
          </div>
          {/* Text 적는 곳 */}
          <div className="w-full h-1/2 border-8 border-t-0 border-borderGray text-white p-8">
            나의 부캐에 대해 여러분의 느낌대로 표현해 주세요!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
