"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = __importDefault(require("sequelize"));
exports.Cliente = connection_1.default.define('Clientes', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idType: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    documentNumber: {
        type: sequelize_1.default.STRING(20),
        allowNull: false,
        unique: true
    },
    personType: {
        type: sequelize_1.default.STRING(50),
        defaultValue: "Natural",
        allowNull: false
    },
    name: {
        type: sequelize_1.default.STRING(100),
        allowNull: false,
        unique: false
    },
    lastname: {
        type: sequelize_1.default.STRING(150),
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING(180),
        allowNull: false,
    },
    number: {
        type: sequelize_1.default.STRING(20),
        allowNull: false
    },
    address: {
        type: sequelize_1.default.STRING(200),
        allowNull: true
    }
}, {
    freezeTableName: true,
    paranoid: true
});
