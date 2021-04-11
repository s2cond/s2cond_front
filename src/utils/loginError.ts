const loginError = (err: string) => {
  switch (err) {
    case 'auth/wrong-password':
      return '비밀번호가 틀렸습니다!';
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
    default:
      return '인증에 오류가 있습니다.';
  }
};

export default loginError;
