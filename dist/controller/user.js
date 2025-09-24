"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordReset = exports.requestPasswordReset = exports.userLogin = exports.userRegister = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const userRegister = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    const emailExist = await user_1.User.findOne({ where: { email: email } });
    // if (credentials === "" || credentials === null) {
    //     return res.status(400).json({
    //         msg: `crentails is empty or null`
    //     })
    // }
    // const credentialsExist = await User.findOne({ where: { credentials: credentials } });
    // if (credentialsExist) {
    //     return res.json({
    //         msg: `The credentials ${credentials} is already exist`
    //     })
    // }
    try {
        if (emailExist) {
            res.status(409).json({
                msg: `The email ${email} is already exsist`
            });
            return;
        }
        const passwordUserHash = await bcrypt_1.default.hash(password, 10);
        await user_1.User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordUserHash,
            // credentials: credentials,n
            status: 1
        });
        res.status(201).json({
            msg: {
                userName: name
            }
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `The user ${name} has't been creates for error: ${error}`,
            body: req.body
        });
    }
};
exports.userRegister = userRegister;
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const userExist = await user_1.User.findOne({ where: { email: email } });
    if (!userExist) {
        return res.status(404).json({
            msg: `The email ${email} do not exist`,
            body: 'usuario no existe'
        });
    }
    const passwordValid = await bcrypt_1.default.compare(password, userExist.password);
    if (!passwordValid) {
        return res.status(401).json({
            msg: `Incorrect password`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        email
    }, process.env.SECRET_KEY || "890sfd798s56423jk", { expiresIn: "1h" });
    return res.status(202).json({
        msg: `Welcome ${userExist.name}`,
        body: token
    });
};
exports.userLogin = userLogin;
const requestPasswordReset = async (req, res) => {
    try {
        const email = req.body.email;
        if (email == "") {
            console.log("empty email");
            return res.json({ msg: `empty email` });
        }
        const emailExist = await user_1.User.findOne({ where: { email: email } });
        if (!emailExist) {
            console.log("The email is not exist");
            return res.json("The email is not exist");
        }
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'fjeni5889@gmail.com',
                pass: 'nkct nczk yvzr kaws'
            }
        });
        const mailOptions = {
            from: process.env.TRANSPORTER_EMAIL || 'fjeni5889@gmail.com',
            to: email,
            subject: 'Click on the following URL to change your password',
            html: `http://localhost:${process.env.PORT}/api/user/processResetPassword`
        };
        await transporter.sendMail(mailOptions);
        console.log(` the email has been created: ${mailOptions}`);
        return res.json({
            msg: `the email has been sended to: ${mailOptions.to}`,
            body: email
        });
    }
    catch (error) {
        console.log(` the email has not been created: ${error}`);
    }
};
exports.requestPasswordReset = requestPasswordReset;
const passwordReset = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email == "" || password == "") {
            return res.status(400).json({
                msg: `Email or password is empty`,
                body: req.body
            });
        }
        try {
            const user = await user_1.User.findOne({
                where: {
                    email: email
                }
            });
            const oldPassword = await user.password;
            const verifyPassawords = await bcrypt_1.default.compare(password, oldPassword);
            if (verifyPassawords) {
                return res.json({ msg: `The password can not be the same as previous one` });
            }
        }
        catch (error) {
            res.json({
                msg: `process find one uncompleted`,
                body: "By: " + error
            });
        }
        const newPassword = await bcrypt_1.default.hash(password, 10);
        await user_1.User.update({ password: newPassword }, { where: { email: email, } });
        res.json({
            msg: `password changed`,
        });
    }
    catch (error) {
        res.json({
            msg: `process uncompleted`,
            body: "By: " + error
        });
    }
};
exports.passwordReset = passwordReset;
