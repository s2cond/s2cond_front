import React from 'react';
import Instagram from 'assets/img/instagram.png';
import LinkedIn from 'assets/img/linkedin.png';
import Github from 'assets/img/github.png';
import Notion from 'assets/img/notion.png';
import Youtube from 'assets/img/youtube.png';
const SocialBtn = () => {
  //social 항목을 불러와서 비교
  return (
    <div className="flex">
      <div className="flex justify-center align-middle p-2 mr-2 border-1 rounded-full border-textBlack">
        <img src={Instagram} alt="instagram" />
      </div>
      <div className="flex justify-center align-middle p-2 mr-2 border-1 rounded-full border-textBlack">
        <img src={LinkedIn} alt="instagram" />
      </div>
      <div className="flex justify-center align-middle p-2 mr-2 border-1 rounded-full border-textBlack">
        <img src={Github} alt="instagram" />
      </div>
      <div className="flex justify-center align-middle p-2 mr-2 border-1 rounded-full border-textBlack">
        <img src={Notion} alt="instagram" />
      </div>
      <div className="flex justify-center align-middle p-2 mr-2 border-1 rounded-full border-textBlack">
        <img src={Youtube} alt="instagram" />
      </div>
    </div>
  );
};

export default SocialBtn;
