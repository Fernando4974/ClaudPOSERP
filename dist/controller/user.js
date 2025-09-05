"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegiter = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRegiter = async (req, res) => {
    const { nameUser, lastNameUser, emailUser, passwordUser, credentialsUser } = req.body;
    const emailExist = await user_1.User.findOne({ where: { emailUser: emailUser } });
    if (emailExist) {
        return res.json({
            msg: `The email ${emailUser} is already exsist`
        });
    }
    const credentialsExist = await user_1.User.findOne({ where: { credentialsUser: credentialsUser } });
    if (credentialsExist) {
        return res.json({
            msg: `The credentials ${credentialsExist} is already exist`
        });
    }
    try {
        const passwordUserHash = await bcrypt_1.default.hash(passwordUser, 10);
        await user_1.User.create({
            nameUser: nameUser,
            lastNameUser: lastNameUser,
            emailUser: emailUser,
            passwordUser: passwordUserHash,
            credentialsUser: credentialsUser,
        });
        res.status(200).json({
            msg: `The user ${name} has been created`
        });
    }
    catch (error) {
        res.status(500).json({
            msg: `The user ${nameUser} has't been creates for error: ${error}`,
            body: req.body
        });
    }
};
exports.userRegiter = userRegiter;
