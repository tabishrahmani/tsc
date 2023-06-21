import { NextFunction, Request, Response, Router } from "express";
import validator from "../../utils/middleware/validator";
import { createUserSchema } from "./user.validation";
import * as authController from "./user.auth";
import responseHandler from "../../utils/handler/responseHandler";

const userRouter: Router = Router();

userRouter.post(
  "/",
  validator(createUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authController.createUser(req.body);
      responseHandler(res, "User created successfully", null, 201);
    } catch (error: any) {
      error.reference = error.reference ? error.reference : "POST /users";
      next(error);
    }
  }
);

export default userRouter;
