const verifyError = (err: string) => {
  console.log(err);
  switch (err) {
    case 'auth/wrong-password':
      return '아이디/비밀번호가 틀렸습니다!';
    case 'auth/email-already-in-use':
      return '이미 사용중인 메일입니다';
    case 'auth/user-not-found':
      return '계정이 존재하지 않습니다';
    case 'auth/invalid-email':
      return '이메일 형식이 올바르지 않습니다';
    case 'auth/weak-password':
      return '비밀번호 보안이 약합니다';
    case 'auth/too-many-requests':
      return '인증 횟수를 초과했습니다. 잠시 후 시도해 주세요';
    // signInWithPopup
    case 'auth/account-exists-with-different-credential':
      return '다른 로그인 방법으로 가입된 이메일입니다';
    case 'auth/popup-blocked':
      return '팝업창을 허용해주세요';
    // verifyPhoneNumber
    case 'auth/captcha-check-failed':
      return 'Captcha를 불러오는데 실패했습니다. 새로 고침 해주세요';
    case 'auth/invalid-phone-number':
      return '전화번호가 잘못됐습니다';
    case 'auth/missing-phone-number':
      return '존재하지 않는 전화번호입니다';
    case 'auth/quota-exceeded':
      return '인증시간을 초과했습니다';
    case 'auth/second-factor-already-in-use':
      return 'Captcha를 불러오는데 실패했습니다. 새로 고침 해주세요';
    // PhoneAuthProvider.credential
    case 'auth/missing-verification-code':
      return '인증번호가 틀렸습니다.';
    case 'auth/missing-verification-id':
      return '인증 ID가 다릅니다. s2cond로 문의해주세요.';
    default:
      return '인증에 오류가 있습니다.';
  }
};

export default verifyError;
