"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const connection_js_1 = __importDefault(require("../../dominio/database/connection.js"));
exports.User = connection_js_1.default.define(
///Tabla Usuarios
"Users", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.default.STRING(100),
        allowNull: false,
        unique: false,
    },
    lastname: {
        type: sequelize_1.default.STRING(150),
        allowNull: false,
    },
    email: {
        type: sequelize_1.default.STRING(180),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.default.STRING(200),
        allowNull: false,
    },
    // credentials:{
    //     type:DataTypes.INTEGER,
    //     allowNull:true,
    //     unique:true,
    // },
    status: {
        type: sequelize_1.default.STRING(50),
        allowNull: true,
    },
}, {
    freezeTableName: true,
    paranoid: true,
});
