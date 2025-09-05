import { userRegister,userLogin } from "../controller/user";
import { Router } from "express";


export const routerRegisterUser = Router();
routerRegisterUser.post("/api/user/register",userRegister);
export const routerLoginUser = Router();
routerLoginUser.post("/api/user/login",userLogin);