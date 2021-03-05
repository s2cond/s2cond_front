import React, { useEffect, useState } from 'react';
import styles from 'scss/pages/Landing.module.scss';
import starsEyes from 'assets/img/starsEyes.png';

const VertifyPhone = () => {
  const [phoneNum, setPhoneNum] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneNum(e.target.value);
    }
  };
  useEffect(() => {
    if (phoneNum.length === 10) {
      setPhoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNum.length === 13) {
      setPhoneNum(
        phoneNum.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [phoneNum]);
  const onSend = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  return (
    <div className={styles.landingBody}>
      <div className="text-center mt-36 ">
        <div className="mb-48">
          <img src={starsEyes} alt="stars-eyes" className="mx-auto" />
          <p className="text-2xl font-bold text-s2condLime">
            혹시 전화번호가 어떻게 되나요?
          </p>
          <p className="font-thin">
            초대장이 없으시면 요원신청을 통해 waitlist에 등록됩니다
          </p>
        </div>
        <form>
          <div className="flex justify-center align-middle ">
            <input
              type="text"
              placeholder="인증 받을 전화번호를 입력해주세요"
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              maxLength={13}
              onChange={handleChange}
              value={phoneNum}
              className="bg-bgBlack border-0 foucs:outline-none text-white"
            />
            <input
              type="submit"
              value="전송"
              className="bg-bgBlack text-white"
              onSubmit={onSend}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VertifyPhone;
