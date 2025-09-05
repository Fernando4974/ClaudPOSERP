import { userRegiter } from "../controller/user";
import { Router } from "express";

export const routerRegisterUser = Router();
routerRegisterUser.post("/api/post/user/register",userRegiter);