import DataTypes from "sequelize";
import sequelize from "../../dominio/database/connection.js";

export const User = sequelize.define(
  ///Tabla Usuarios
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    lastname: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(180),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    // credentials:{
    //     type:DataTypes.INTEGER,
    //     allowNull:true,
    //     unique:true,
    // },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);
