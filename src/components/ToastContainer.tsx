import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import classnames from 'classnames';
import styles from 'scss/components/Toast.module.scss';
import { ToastType } from 'store/toast/types';
import { deleteToast } from 'store/toast/action';

enum ToastStatus {
  Init = 'init',
  Show = 'show',
  Close = 'close',
}

const ToastItem: React.FC<ToastType> = ({ id, text }) => {
  const [status, setStatus] = useState(ToastStatus.Init);
  const dispatch = useDispatch();
  const timeoutId = useRef<number>();
  const closeToast = () => setStatus(ToastStatus.Close);
  const deleteToastItem = () => dispatch(deleteToast(id));
  const handleTransitionEnd = () =>
    status === ToastStatus.Close && deleteToastItem();
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setStatus(ToastStatus.Show);
        timeoutId.current = window.setTimeout(closeToast, 3000);
      });
    });
    return () => {
      timeoutId.current ?? window.clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <div
      className={classnames(styles.toast, {
        [styles.toastShow]: status === ToastStatus.Show,
        [styles.toastClose]: status === ToastStatus.Close,
      })}
      onTransitionEnd={handleTransitionEnd}
      onClick={closeToast}
    >
      <p className="flex-1 p-3 text-center font-bold text-bgBlack">{text}</p>
    </div>
  );
};

const ToastContainer = () => {
  const toasts = useSelector((state: RootState) => state.toast);
  console.log(toasts);
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
