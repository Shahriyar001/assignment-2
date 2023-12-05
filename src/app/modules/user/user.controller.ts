import { Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const result = await UserService.createUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB();

    const filteredResult = result.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: filteredResult,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.getSingleUserFromDB(userId);

    // Use a method to check if the user exists
    // const userExists = await UserService.doesUserExist(userId);

    // if (!userExists) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'User not found!',
    //     data: null,
    //   });
    // }

    // // Retrieve the user information
    // const result = await UserService.getSingleUserFromDB(userId);

    // // Exclude the password field from the response
    // const { password, ...userData } = result;

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.error(err);
    // res.status(500).json({
    //   success: false,
    //   message: 'Internal server error',
    //   error: err.message,
    // });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
