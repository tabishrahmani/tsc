import { Types } from "mongoose";

export interface IUser {
  name: string;
  phoneNumber: { countryCode: string; mobileNumber: string };
  email: string;
  password: string;
}

export interface GetUser {
  _id: Types.ObjectId;
  name: string;
  phoneNumber: { countryCode: string; mobileNumber: string };
  email: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface UserParams {
  _id?: Types.ObjectId;
  name?: string;
  "phoneNumber.countryCode"?: string;
  "phoneNumber.mobileNumber"?: string;
  email?: string;
}
