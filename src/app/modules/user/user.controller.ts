import { Request, Response } from 'express';
import { UserService } from './user.service';
import Joi from 'joi';

const createUser = async (req: Request, res: Response) => {
  try {
    // creating a scema validation using joi

    const fullNameSchema = Joi.object({
      firstName: Joi.string()
        .required()
        .trim()
        .pattern(/^[A-Z][a-z]*$/),
      lastName: Joi.string()
        .required()
        .trim()
        .pattern(/^[A-Za-z]+$/),
    });

    const addressSchema = Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
    });

    const orderSchema = Joi.object({
      productName: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    });

    const userSchema = Joi.object({
      userId: Joi.number().required(),
      username: Joi.string().required().trim(),
      password: Joi.string().required(),
      fullName: fullNameSchema.required(),
      age: Joi.number().required(),
      email: Joi.string().required().email(),
      isActive: Joi.string().valid('active', 'blocked').default('active'),
      hobbies: Joi.array().items(Joi.string()).required(),
      address: addressSchema.required(),
      orders: Joi.array().items(orderSchema),
    });

    const { user: userData } = req.body;

    const { error, value } = userSchema.validate(userData);

    // console.log(error, value);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.details,
      });
    }

    const result = await UserService.createUserIntoDB(userData);

    const data = result.toObject();
    const userWithoutPassword = { ...data, password: undefined };

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: userWithoutPassword,
    });
  } catch (err) {
    // console.log(err);
    // Handle errors and send an appropriate response
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
