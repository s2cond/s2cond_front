const checkValid = (password: string) => {
  const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;

  if (reg.test(password)) {
    return true;
  } else {
    return false;
  }
};

export default checkValid;
