import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phoneNumber: {
      countryCode: { type: String, required: true },
      mobileNumber: { type: String, required: true, unique: true },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = model<IUser>("user", userSchema);

export default User;
