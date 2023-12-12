import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  UserMethods,
  UserModel,
  TUserOrder,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const addressSchema = new Schema<TUserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<TUserOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type',
    },
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    defauly: 'active',
  },
  hobbies: { type: [String], required: true },
  address: addressSchema,
  orders: [orderSchema],
});

// pre save middleware
userSchema.pre('save', async function (next) {
  //   console.log(this, 'pre hook : we will save to data');
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post save middleware hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// creating a custom satic method

userSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

// creating a custom instance method
// userSchema.methods.isUserExists = async function (id: number) {
//   const existingUser = await User.findOne({ userId: id });

//   return existingUser;
// };

export const User = model<TUser, UserModel>('User', userSchema);
