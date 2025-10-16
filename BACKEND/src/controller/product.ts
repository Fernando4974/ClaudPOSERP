import { json, Op } from "sequelize";
import { Product } from "../models/product";
import type { Request,Response } from "express";

 export const registerProduct = async( req:Request,res:Response )=>{


    const {nameProduct,descriptionProduct,priceProduct,barcode,statusProduct}=req.body;
    const nameProductAlreadyExist= await Product.findOne({where:{nameProduct:nameProduct}});

    if (nameProductAlreadyExist) {
        return res.json(`The product ${nameProduct} is already exist`);
    }

    try {

        await Product.create({
            nameProduct:nameProduct,
            descriptionProduct:descriptionProduct,
            priceProduct:priceProduct,
            barcode:barcode,
            statusProduct:statusProduct,

        })
        res.status(200).json({
            msg:`The product ${nameProduct} has been created`
        })
        
    } catch (error) {

        res.status(500).json({

            msg:`The product ${nameProduct} hasn't been create by de error ${error}`,
            body: req.body
        })
        
    }

}

export const getAllProducts = async (req:Request,res:Response)=>{

    try {

       const allProducts = await Product.findAll()
        res.status(200).json(
        allProducts
        )

    } catch (error) {
        res.status(400),json({
            msg:`The get can´t be completated by the error ${error}`
        })
    }


}
export const getOneProduct= async (req:Request,res:Response)=>{

    const {idProduct,nameProduct,barcode}=req.body;

    if(idProduct){
        const productById= await Product.findOne({where:{idProduct:idProduct}});
        return res.status(200).json(productById);
    }
    if(nameProduct){
        const productByName= await Product.findAll(
            {
                where:{nameProduct:{[Op.like]:`%${nameProduct}%`}
                    
                }
    });
        return res.status(200).json(productByName);
    }
    if(nameProduct){
        const productByBarcode= await Product.findOne({where:{barcode:{[Op.like]:`%${barcode}%`}}});
        return res.status(200).json(productByBarcode);
    }
   


}