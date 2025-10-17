import { Router } from "express";
import {
  requestPasswordReset,
  passwordReset,
  userRegister,
  userLogin,
} from "../../infraestructura/controller/user";

export const authPassword = Router();
authPassword.post("/reqPasswordReset", requestPasswordReset);
authPassword.put("/passwordReset", passwordReset);

export const routerRegisterUser = Router();
routerRegisterUser.post("/api/user/register", userRegister);

export const routerLoginUser = Router();
routerLoginUser.post("/api/user/login", userLogin);
