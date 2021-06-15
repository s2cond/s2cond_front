import { useEffect, useState } from 'react';
import timeFormat from '../utils/timeFormat';
import classnames from 'classnames';
import { showToast } from 'store/toast/action';
import { useDispatch } from 'react-redux';

type Props = {
  startTime: boolean;
  verify: boolean;
  setStartTime: React.Dispatch<React.SetStateAction<boolean>>;
};
const AuthTimer: React.FC<Props> = ({ startTime, verify, setStartTime }) => {
  const [time, setTime] = useState(180);
  const dispatch = useDispatch();
  useEffect(() => {
    if (time > 0 && startTime) {
      const Counter = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(Counter);
    }
    if (time < 0) {
      dispatch(showToast('인증 시간이 만료됐습니다.'));
      setStartTime(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [time, startTime, dispatch, setStartTime]);
  return (
    <>
      <p
        className={classnames(
          'text-right mr-2 mt-10 mb-2 text-xs text-white font-light',
          {
            hidden: !verify,
          },
        )}
      >
        인증 잔여 시간 {timeFormat(time)}
      </p>
    </>
  );
};

export default AuthTimer;
