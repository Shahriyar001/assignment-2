import { Request, Response } from 'express';
import { UserService } from './user.service';
// import Joi from 'joi';
// import userValidationSchema from './user.validation';
import { z } from 'zod';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    // creating a scema validation using zod

    const { user: userData } = req.body;

    // data valodation using joi
    // const { error, value} = userValidationSchema.validate(userData);

    // data validation using zod

    const zodparsedData = userValidationSchema.parse(userData);

    const result = await UserService.createUserIntoDB(zodparsedData);

    // console.log(error, value);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Internal server error',
    //     error: error.details,
    //   });
    // }

    const data = result.toObject();
    const userWithoutPassword = { ...data, password: undefined };

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: userWithoutPassword,
    });
  } catch (err: any) {
    // console.log(err);
    // Handle errors and send an appropriate response
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error',
      // error: error.details,
    });
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

    const data = result.toObject();
    const userWithoutPassword = { ...data, password: undefined };

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      //   success: false,
      //   message: 'Internal server error',
      //   error: err.message,
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
