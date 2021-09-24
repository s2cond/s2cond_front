import React, { useEffect, useState } from 'react';
import Nav from 'components/Nav';
import SocialBtn from 'components/SocialBtn';
import { authService, dbService } from '../fbase';
import { MEMBER } from 'constants/userStatus';
import { Emoji } from 'emoji-mart';
import { RouteComponentProps } from '@reach/router';
import classnames from 'classnames';
import {
  profileType,
  jobVacanciesType,
  jobVacanciesConv,
  participationMethodType,
  participationMethodConv,
} from '../constants/profileTypes';
import styles from 'scss/pages/Landing.module.scss';
import relative from 'scss/components/relativePosition.module.scss';
import { emptyProfile } from '../constants/emptyProfile';
import setBorderColor from '../utils/setBorderColor';

interface Props extends RouteComponentProps {
  dailyMe: profileType;
  s2condMe: profileType;
}
const Profile: React.FC<Props> = (props) => {
  const [isDaily, setIsDaily] = useState(false);
  const userState = props.location?.state as Props;
  const [state, setState] = useState<Props | undefined>(userState || undefined);
  const [data, setData] = useState<profileType | undefined>(emptyProfile);

  // uid가 링크와 같으면 mypage로 redirect
  const user = authService.currentUser;
  if (props.location?.pathname.split('/')[2] === user?.uid) {
    window.location.href = `/mypage`;
  }

  useEffect(() => {
    if (!state) {
      const params = props.location?.pathname;
      const uid = params?.substr(params.lastIndexOf('/') + 1);
      dbService
        .collection('users')
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let tmp = doc.data() as Props;
            setState({ dailyMe: tmp.dailyMe, s2condMe: tmp.s2condMe });
          } else {
            throw new Error('User is not exists');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setData(() => (isDaily ? state?.dailyMe : state?.s2condMe));
  }, [state]);

  useEffect(() => {
    setData(() => (isDaily ? state?.dailyMe : state?.s2condMe));
  }, [isDaily]);

  return (
    <div className={classnames('h-screen', styles.landingBody)}>
      <Nav status={MEMBER} />
      <div className="flex justify-center h-2/3 align-middle mt-24 mx-56">
        {/* sidebar */}
        <div className="w-40">
          <button
            className={classnames(
              `flex justify-start align-middle w-36 py-1 pl-2 border-8 border-r-0 focus:outline-none `,
              {
                [`${setBorderColor(data?.jobVacancies as string)}`]: !isDaily,
                'border-textBlack': isDaily,
              },
            )}
            onClick={() => setIsDaily(false)}
          >
            <div>
              <Emoji emoji="santa" set="apple" size={16} />
            </div>
            <p className="text-borderGray font-bold ml-1">S2cond Me</p>
          </button>
          <button
            className={classnames(
              `flex justify-start align-middle w-36 py-1 pl-2 border-8 border-r-0 focus:outline-none`,
              {
                [`${setBorderColor(data?.jobVacancies as string)}`]: isDaily,
                'border-textBlack': !isDaily,
              },
            )}
            onClick={() => setIsDaily(true)}
          >
            <div>
              <Emoji emoji="santa" set="apple" size={16} />
            </div>
            <p className="text-borderGray ml-1">Daily Me</p>
          </button>
        </div>
        {/* profile contents */}
        <div className="w-full h-full">
          <div
            className={`w-full border-8 ${setBorderColor(
              data?.jobVacancies as string,
            )} overflow-visible `}
          >
            <div className="flex justify-start align-middle overflow-visible z-10 -mb-6">
              {/* Profile Info */}
              <div className="ml-5 mr-12">
                <div
                  className={classnames(
                    'flex justify-center align-middle z-20 relative rounded-full bg-black p-10',
                    relative.minusTop,
                  )}
                >
                  <Emoji emoji="santa" set="apple" size={43} />
                </div>
                <div
                  className={classnames(
                    'flex justify-center align-middle z-20 relative ml-15 w-15 h-15 rounded-full bg-black p-4 border-white border-2',
                    relative.minusTopSmall,
                  )}
                >
                  <Emoji emoji="santa" set="apple" size={24} />
                </div>
              </div>
              <div>
                <div className="flex mt-6">
                  <div className="text-center text-xs text-white border-white border-1 py-1 px-2 mr-1 rounded-full">
                    @{jobVacanciesConv(data ? data.jobVacancies : 'unselected')}
                  </div>
                  <div className="text-center text-xs text-white border-white border-1 py-1 px-2 rounded-full">
                    @
                    {participationMethodConv(
                      data ? data.participationMethod : 'unselected',
                    )}
                  </div>
                </div>
                <div className="text-white font-bold my-3">
                  {data && data.displayName} 요원
                </div>
                <div>
                  <SocialBtn />
                </div>
              </div>
            </div>
            <div>{/* Profile description */}</div>
          </div>
          {/* Text 적는 곳 */}
          <div
            className={`w-full h-1/2 border-8 border-t-0 ${setBorderColor(
              data?.jobVacancies as string,
            )} text-white p-8`}
          >
            {data ? data.description : 'loading...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
