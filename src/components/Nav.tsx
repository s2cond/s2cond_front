import React from 'react';
import { Link } from 'react-router-dom';
import { NONE, LOGGING_IN, SIGNING_UP, MEMBER } from '../constants/userStatus';
import millennials from 'assets/img/millennials.png';

type UserStatus = { status: 'None' | 'SigningUp' | 'LoggingIn' | 'Member' };

const NavMainBtn = ({ status }: UserStatus) => {
  switch (status) {
    case NONE:
      return (
        <Link
          to="/login"
          className="md:mr-40 mr-56 font-monserrat text-sm font-light text-white"
        >
          로그인
        </Link>
      );
    case LOGGING_IN:
      return (
        <Link
          to="/"
          className="flex md:mr-40 mr-56 font-monserrat text-sm font-bold text-white"
        >
          <img src={millennials} alt="navbar_btn" className="mr-1" />
          요원 신청
        </Link>
      );
    case SIGNING_UP:
      return null;
    case MEMBER:
      return (
        <Link
          to="/"
          className="flex md:mr-40 mr-56 font-monserrat text-sm font-bold text-white"
        >
          <img src={millennials} alt="navbar_btn" className="mr-1" />
          My page
        </Link>
      );
    default:
      return null;
  }
};

const Nav: React.FC<UserStatus> = ({ status }) => {
  return (
    <div className="flex justify-between items-center h-12 bg-textBlack">
      <Link to="/" className="md:ml-40 ml-56 text-white">
        Logo!
      </Link>
      <NavMainBtn status={status} />
    </div>
  );
};

export default Nav;
