import { dbService } from 'fbase';

const getUsers = async () => {
  const users = await dbService.collection('users').get();
  return users.docs.map((doc) => doc.data());
};

export default getUsers;
