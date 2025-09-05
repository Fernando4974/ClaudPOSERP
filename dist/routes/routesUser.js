"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerLoginUser = exports.routerRegisterUser = void 0;
const user_1 = require("../controller/user");
const express_1 = require("express");
exports.routerRegisterUser = (0, express_1.Router)();
exports.routerRegisterUser.post("/api/user/register", user_1.userRegister);
exports.routerLoginUser = (0, express_1.Router)();
exports.routerLoginUser.post("/api/user/login", user_1.userLogin);
