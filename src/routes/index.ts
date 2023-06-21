import { Router } from "express";
import userRouter from "../modules/user/user.route";

const routes: Router = Router();

routes.use("/users", userRouter);

export default routes;
