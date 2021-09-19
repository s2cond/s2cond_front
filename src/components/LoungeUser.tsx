import { profileType } from 'constants/profileTypes';
import React from 'react';
type UserDataType = {
  dailyMe: profileType;
  s2condMe: profileType;
};
const LoungeUser: React.FC<UserDataType> = (data) => {
  console.log('LoungeUser', data);
  const { dailyMe, s2condMe } = data;
  return (
    <>
      <div>{dailyMe.jobVacancies}</div>
    </>
  );
};

export default LoungeUser;
