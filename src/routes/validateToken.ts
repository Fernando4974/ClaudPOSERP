import type {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const validateToken = async (req:Request,res:Response, next:NextFunction)=>{

    const headerToken= req.headers['authorization'];

    if (headerToken !== undefined && headerToken.startsWith('Bearer ') ) {

        try {
            
                const onlyToken = headerToken.slice(7);
                jwt.verify(onlyToken,process.env.SECRET_KEY||"890sfd798s56423jk")

                next();


        } catch (error) {
            res.status(401).json({

                msg:`Token invalido o expirado : ${error}`,
                body:headerToken
            })
            
        }
        
    }
    else{
        res.status(400).json({

                msg:'Acceso denegado: No se proporcionó un token o el formato es incorrecto.',
                body:headerToken

        })
    }



}