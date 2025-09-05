"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const connection_1 = __importDefault(require("../database/connection"));
exports.User = connection_1.default.define(
///Tabla Usuarios
'Users', {
    idUser: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nameUser: {
        type: sequelize_1.default.STRING(100),
        allowNull: false,
        unique: false,
    },
    lastNameUser: {
        type: sequelize_1.default.STRING(150),
        allowNull: false,
    },
    emailUser: {
        type: sequelize_1.default.STRING(180),
        allowNull: false,
        unique: true,
    },
    passwordUser: {
        type: sequelize_1.default.STRING(200),
        allowNull: false,
    },
    credentialsUser: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        unique: true,
    },
    statusUser: {
        type: sequelize_1.default.STRING(50),
        allowNull: true,
    }
}, {
    freezeTableName: true,
    paranoid: true
});
