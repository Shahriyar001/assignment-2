import { model } from 'mongoose';

export type UserFullName = {
  firstName: string;
  lastName: string;
};

export type UserAddress = {
  street: string;
  city: string;
  country: string;
};

export type UserOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: UserFullName;
  age: number;
  email: string;
  isActive: 'active' | 'blocked';
  hobbies: string[];
  address: UserAddress;
  orders?: UserOrder[];
};
