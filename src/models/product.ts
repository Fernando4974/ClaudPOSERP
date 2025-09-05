import sequelize from "../database/connection";
import  DataTypes  from "sequelize";

export const Product = sequelize.define(
    'Product',{
            idProduct:{
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull:false
            },
            nameProduct:{
                type:DataTypes.STRING(100),
                allowNull:false,
                unique:true,
            },
            description:{
                type:DataTypes.STRING(500),
                allowNull:true,
            },
            barcode:{
                type:DataTypes.STRING(100),
                unique:false,
            },
            status:{
                type:DataTypes.STRING(50),
                allowNull:true
            }
    },{
            freezeTableName:true,
            paranoid:true
    }    
)