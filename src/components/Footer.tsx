import React from 'react';

const Footer = () => {
  return (
    <div className="grid grid-cols-3 items-center place-items-center h-12">
      <div className="md:ml-40 ml-56 text-sm text-textBlack font-bold">
        <a
          className="mx-2"
          href="https://notion.com"
          target="_blank"
          rel="noreferrer"
        >
          이용 약관
        </a>
        <a
          className="mx-2"
          href="https://notion.com"
          target="_blank"
          rel="noreferrer"
        >
          개인정보처리방침
        </a>
        <a
          className="mx-2"
          href="https://notion.com"
          target="_blank"
          rel="noreferrer"
        >
          고객문의
        </a>
      </div>
      <p className="text-xs	text-textBlack">
        Copyright &copy; S2cond. {new Date().getFullYear()} All rights reserved.
      </p>
      <div>&nbsp;</div>
    </div>
  );
};

export default Footer;
