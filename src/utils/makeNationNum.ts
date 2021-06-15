const makeNationNum = (num: string, country: string) => {
  return country + num.slice(1, 3) + num.slice(4, 8) + num.slice(9, 13);
};

export default makeNationNum;
