import { useEffect, useState } from 'react';
import timeFormat from '../utils/timeFormat';
import classnames from 'classnames';

type Props = {
  startTime: boolean;
  verify: boolean;
};
const AuthTimer: React.FC<Props> = ({ startTime, verify }) => {
  const [time, setTime] = useState(120);

  useEffect(() => {
    if (time > 0) {
      const Counter = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(Counter);
    }
  }, [time, startTime]);
  return (
    <>
      <p
        className={classnames('text-xs text-white font-light', {
          hidden: !verify,
        })}
      >
        인증 잔여 시간 {timeFormat(time)}
      </p>
    </>
  );
};

export default AuthTimer;
