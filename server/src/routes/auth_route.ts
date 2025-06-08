import { Router } from "express";
import { login, logout, register } from "../controllers/auth_controller";

const authRouter = Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login)
authRouter.route("/logout").post(logout)

export default authRouter;
