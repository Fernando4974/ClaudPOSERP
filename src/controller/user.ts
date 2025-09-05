import { User } from "../models/user";
import type {Request,Response} from 'express';
import bcrypt from 'bcrypt';

export const userRegiter = async(req:Request,res:Response)=>{

    const{nameUser,lastNameUser,emailUser,passwordUser,credentialsUser}=req.body;
    const emailExist: any = await User.findOne({where:{emailUser:emailUser}})

    if (emailExist) {
        
        return res.json({
            msg:`The email ${emailUser} is already exsist`
        })
    }

    const credentialsExist =await User.findOne({where:{credentialsUser:credentialsUser}});

    if (credentialsExist) {

        return res.json({
            msg: `The credentials ${credentialsExist} is already exist`
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
            msg:`The user ${name} has been created`
        })
        
    } catch (error) {
        res.status(500).json({
            msg: `The user ${nameUser} has't been creates for error: ${error}`,
            body: req.body
        })
    }



}