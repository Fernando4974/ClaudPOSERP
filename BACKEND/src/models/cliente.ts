import sequelize from "../database/connection";
import Datatypes from "sequelize"; 

export const Cliente = sequelize.define(
    'Clientes',{
    
        id:{
            type:Datatypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
        },
        idType:{
            type:Datatypes.INTEGER,
            allowNull:false
        },
        documentNumber:{
            type:Datatypes.STRING(20),
            allowNull:false,
            unique:true
        },
        personType:{
            type:Datatypes.STRING(50),
            defaultValue:"Natural",
            allowNull:false
        },
        name:{
            type:Datatypes.STRING(100),
            allowNull:false,
            unique:false
        },
        lastname:{
            type:Datatypes.STRING(150),
            allowNull:false
        },
        email:{
            type:Datatypes.STRING(180),
            allowNull:false,
        },
        number:{
            type:Datatypes.STRING(20),
            allowNull:false
        },
        address:{
            type:Datatypes.STRING(200),
            allowNull:true
        }
    },
            {

            freezeTableName:true,
            paranoid:true
        }
              
        )