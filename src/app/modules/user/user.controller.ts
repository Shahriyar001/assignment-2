import { Request, Response } from 'express';
import { UserService } from './user.service';
// import Joi from 'joi';
// import userValidationSchema from './user.validation';
import { z } from 'zod';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

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
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error',
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error',
      // error: error.details,
    });
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
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     const result = await UserService.deleteUserFromDB(userId);

//     if (!result) {
//       res.status(404).json({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: 'User deleted successfully!',
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: 'User not found',
//       error: {
//         code: 404,
//         description: 'User not found!',
//       },
//     });
//   }
// };

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.deleteUserFromDB(userId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err) {
    console.error('Error in deleteUser:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error',
      error: {
        code: 500,
        description: 'Internal server error',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body.user;

    const result = await UserService.updateUserFromDB(userId, updateData);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      return;
    }

    const data = result.toObject();
    const userWithoutPassword = { ...data, password: undefined };

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error',
      error: {
        code: 500,
        description: 'Internal server error',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
