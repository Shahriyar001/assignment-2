// import { model } from 'mongoose';

import { Model } from 'mongoose';

export type TUserFullName = {
  firstName: string;
  lastName: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUserOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: 'active' | 'blocked';
  hobbies: string[];
  address: TUserAddress;
  orders?: TUserOrder[];
};

// for creating static

export interface UserModel extends Model<TUser> {
  isUserExists(id: number): Promise<TUser | null>;
}

// for creating instance

// export interface UserMethods {
//   isUserExists(id: number): Promise<TUser | null>;
// }

// export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
