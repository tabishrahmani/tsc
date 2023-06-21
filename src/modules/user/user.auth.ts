import { AppError } from "../../utils/handler/errorHandler";
import { GetUser, IUser } from "./user.interface";
import * as userService from "./user.service";

export async function createUser(data: IUser): Promise<GetUser> {
  const reference: string = "auth-createUser";

  const [userFromEmail, userFromMobileNumber] = await Promise.all([
    userService.getUser({ email: data.email }),
    userService.getUser({
      "phoneNumber.mobileNumber": data.phoneNumber.mobileNumber,
    }),
  ]);
  if (userFromEmail) {
    throw new AppError(reference, "Email already exists", 412);
  }

  if (userFromMobileNumber) {
    throw new AppError(reference, "Mobile number already exists", 412);
  }

  return await userService.createUser(data);
}
