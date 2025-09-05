import { User } from "../models/user";
import type {Request,Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRegister = async(req:Request,res:Response)=>{

    const{nameUser,lastNameUser,emailUser,passwordUser,credentialsUser}=req.body;
    const emailExist: any = await User.findOne({where:{emailUser:emailUser}})

    if (emailExist) {
        
        return res.json({
            msg:`The email ${emailUser} is already exsist`
        })
    }
    if (credentialsUser==="" || credentialsUser=== null) {
        
        return res.json({
            msg: `crentails is empty or null`
        })
    }

    const credentialsExist =await User.findOne({where:{credentialsUser:credentialsUser}});
    
    if (credentialsExist) {

        return res.json({
            msg: `The credentials ${credentialsUser} is already exist`
        })
        
    }
    try {
    

        const passwordUserHash= await bcrypt.hash(passwordUser,10);

        await User.create({
            nameUser:nameUser,
            lastNameUser:lastNameUser,
            emailUser:emailUser,
            passwordUser:passwordUserHash,
            credentialsUser:credentialsUser,
        })
        res.status(200).json({
            msg:`The user ${nameUser} has been created`
        })
        
    } catch (error) {
        res.status(500).json({
            msg: `The user ${nameUser} has't been creates for error: ${error}`,
            body: req.body
        })
    }



}
export const userLogin = async(req:Request,res:Response)=>{

    const{emailUser,passwordUser}=req.body;

    const userExist : any = await User.findOne({where:{emailUser:emailUser}});
    const passwordValid= await bcrypt.compare(passwordUser,userExist.passwordUser);
    if (!userExist) {
        
        return res.json({
            msg: `The email ${emailUser} do not exist`
        })
    }
    if (!passwordValid) {
        
        return res.json({
            msg:`Incorrect password`
        })
    }

    const token= jwt.sign({
        emailUser
    },process.env.SECRET_KEY||"890sfd798s56423jk")

    res.json({
        msg:`Welcome ${userExist.userName}`,
        body:token
    })
}