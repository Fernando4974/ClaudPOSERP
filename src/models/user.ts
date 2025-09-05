import  DataTypes  from "sequelize";
import sequelize from "../database/connection";

export const User = sequelize.define(
    
                                                ///Tabla Usuarios
    'Users',{

    idUser:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    nameUser:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:false,
    },
    lastNameUser:{
        type:DataTypes.STRING(150),
        allowNull:false,
    },
    emailUser:{
        type:DataTypes.STRING(180),
        allowNull:false,
        unique:true, 
    },
    passwordUser:{
        type:DataTypes.STRING(200),
        allowNull:false,
    },
    credentialsUser:{
        type:DataTypes.INTEGER,
        allowNull:true,
        unique:true,
    },
    statusUser:{
        type:DataTypes.STRING(50),
        allowNull:true,
    }

},
{
    freezeTableName:true,
    paranoid:true
}

)