"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerRegisterUser = void 0;
const user_1 = require("../controller/user");
const express_1 = require("express");
exports.routerRegisterUser = (0, express_1.Router)();
exports.routerRegisterUser.post("/api/post/user/register", user_1.userRegiter);
