import { firebaseInstance } from '../fbase';

const phoneAuth = async (verify: string, verifyNum: string) => {
  try {
    const result = await firebaseInstance.auth.PhoneAuthProvider.credential(
      verify,
      verifyNum,
    );
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
  //   new Promise((res, rej) => {
  //     console.log(
  //       firebaseInstance.auth.PhoneAuthProvider.credential(verify, verifyNum),
  //     );
  //   })
  //     .then((result) => {
  //       console.log('RESULT:', result);
  //       return result;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return err;
  //     });
};

////
// const phoneAuth = (verify: string, verifyNum: string) => {
//   const result = firebaseInstance.auth.PhoneAuthProvider.credential(
//     verify,
//     verifyNum,
//   );
//   return result;
// };

export default phoneAuth;

