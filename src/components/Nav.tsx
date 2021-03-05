import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="flex justify-between items-center h-12 bg-textBlack">
      <Link to="/" className="md:ml-40 ml-56 text-white">
        Logo
      </Link>
      <Link
        to="/login"
        className="md:mr-40 mr-56 font-monserrat text-sm font-light text-white"
      >
        로그인
      </Link>
    </div>
  );
};

export default Nav;
