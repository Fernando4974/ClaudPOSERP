import { User } from "../models/user";
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'

export const userRegister = async (req: Request, res: Response) => {

    const { name, lastname, email, password } = req.body;
    const emailExist: any = await User.findOne({ where: { email: email } })

    if (emailExist) {

        return res.json({
            msg: `The email ${email} is already exsist`
        })
    }
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


        const passwordUserHash = await bcrypt.hash(password, 10);

        await User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordUserHash,
         // credentials: credentials,
            status:1
        })
        res.status(200).json({
            msg: `The user ${name} has been created`
        })

    } catch (error) {
        res.status(400).json({
            msg: `The user ${name} has't been creates for error: ${error}`,
            body: req.body
        })
    }



}
export const userLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const userExist: any = await User.findOne({ where: { email: email } });
    
    if (!userExist) {

        return res.status(404).json({

            msg: `The email ${email} do not exist`,
            body:'usuario no existe'
        })
    }
    const passwordValid = await bcrypt.compare(password, userExist.password);
    if (!passwordValid) {

        return res.status(401).json({
            msg: `Incorrect password`
        })
    }

    const token = jwt.sign({
        email
    }, process.env.SECRET_KEY || "890sfd798s56423jk", { expiresIn: "1h" })

    res.json({
        msg: `Welcome ${userExist.name}`,
        body: token
    })
}

export const requestPasswordReset = async (req: Request, res: Response) => {

    try {



        const email = req.body.email;

        if (email == "") {
            console.log("empty email");
            return res.json({ msg: `empty email` })
        }
        const emailExist = await User.findOne({ where: { email: email } });

        if (!emailExist) {

            console.log("The email is not exist");
            return res.json("The email is not exist");
        }


        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: 'fjeni5889@gmail.com',
                pass: 'nkct nczk yvzr kaws'
            }



        })

        const mailOptions =
        {
            from: process.env.TRANSPORTER_EMAIL || 'fjeni5889@gmail.com',
            to: email,
            subject: 'Click on the following URL to change your password',
            html: `http://localhost:${process.env.PORT}/api/user/processResetPassword`



        }

        await transporter.sendMail(mailOptions)
        console.log(` the email has been created: ${mailOptions}`);
        return res.json({
            msg: `the email has been sended to: ${mailOptions.to}`,
            body: email
        })

    } catch (error) {

        console.log(` the email has not been created: ${error}`)

    }
}


export const passwordReset = async (req: Request, res: Response) => {


    try {

        const { email, password } = req.body

        if (email == "" || password == "") {

            return res.status(400).json({
                msg: `Email or password is empty`,
                body: req.body
            })

        }


        try {
            const user: any = await User.findOne(
                {
                    where: {
                        email: email
                    }
                }
            )

            const oldPassword = await user.password;

            const verifyPassawords = await bcrypt.compare(password, oldPassword);



            if (verifyPassawords) {

                return res.json({ msg: `The password can not be the same as previous one` });

            }
        }
        catch (error) {
            res.json({
                msg: `process find one uncompleted`,
                body: "By: " + error
            }
            )
        }

        const newPassword = await bcrypt.hash(password, 10)

        await User.update({ password: newPassword }, { where: { email: email, } });
        res.json({
            msg: `password changed`,
       
        })



    } catch (error) {


        res.json({
            msg: `process uncompleted`,
            body: "By: " + error
        })
    }



}