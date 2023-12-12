import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User Already exists!');
  }

  const result = await User.create(userData); //build in static method

  //   const user = new User(userData); // create an instance methods

  //   if (await user.isUserExists(userData.userId)) {
  //     throw new Error('User Already exists!');
  //   }

  //   const result = await user.save(); // build in instanse
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await User.findOne({ userId: id });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
