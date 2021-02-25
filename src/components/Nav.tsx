import React from 'react';

const Nav = () => {
  return (
    <div className="flex justify-between items-center h-12 bg-textBlack">
      <div className="md:ml-40 ml-56 text-white">Logo</div>
      <div className="md:mr-40 mr-56 font-monserrat text-sm font-light text-white">
        Login
      </div>
    </div>
  );
};

export default Nav;
