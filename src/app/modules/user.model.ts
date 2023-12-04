import { Schema, model, connect } from 'mongoose';
import {
  User,
  UserAddress,
  UserFullName,
  UserOrder,
} from './user/user.interface';

const fullNameSchema = new Schema<UserFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<UserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<UserOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: String, enum: ['active', 'blocked'], required: true },
  hobbies: { type: [String], required: true },
  address: addressSchema,
  orders: [orderSchema],
});

const User = model<User>('User', userSchema);
