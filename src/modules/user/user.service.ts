import { GetUser, IUser, UserParams } from "./user.interface";
import User from "./user.model";

export async function getUser(params: UserParams): Promise<GetUser | null> {
  return await User.findOne(params);
}

export async function createUser(data: IUser): Promise<GetUser> {
  return await User.create(data);
}
