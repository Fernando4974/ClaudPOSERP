"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userRegister = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRegister = async (req, res) => {
    const { nameUser, lastNameUser, emailUser, passwordUser, credentialsUser } = req.body;
    const emailExist = await user_1.User.findOne({ where: { emailUser: emailUser } });
    if (emailExist) {
        return res.json({
            msg: `The email ${emailUser} is already exsist`
        });
    }
    if (credentialsUser === "" || credentialsUser === null) {
        return res.json({
            msg: `crentails is empty or null`
        });
    }
    const credentialsExist = await user_1.User.findOne({ where: { credentialsUser: credentialsUser } });
    if (credentialsExist) {
        return res.json({
            msg: `The credentials ${credentialsUser} is already exist`
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
            msg: `The user ${nameUser} has been created`
        });
    }
    catch (error) {
        res.status(500).json({
            msg: `The user ${nameUser} has't been creates for error: ${error}`,
            body: req.body
        });
    }
};
exports.userRegister = userRegister;
const userLogin = async (req, res) => {
    const { emailUser, passwordUser } = req.body;
    const userExist = await user_1.User.findOne({ where: { emailUser: emailUser } });
    const passwordValid = await bcrypt_1.default.compare(passwordUser, userExist.passwordUser);
    if (!userExist) {
        return res.json({
            msg: `The email ${emailUser} do not exist`
        });
    }
    if (!passwordValid) {
        return res.json({
            msg: `Incorrect password`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        emailUser
    }, process.env.SECRET_KEY || "890sfd798s56423jk", { expiresIn: "1h" });
    res.json({
        msg: `Welcome ${userExist.nameUser}`,
        body: token
    });
};
exports.userLogin = userLogin;
