const checkValid = (password: string) => {
  const reg =
    /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&+=]).*$/;

  if (reg.test(password)) {
    return true;
  } else {
    return false;
  }
};

export default checkValid;
