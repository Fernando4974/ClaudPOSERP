"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = __importDefault(require("sequelize"));
exports.Product = connection_1.default.define('Products', {
    idProduct: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nameProduct: {
        type: sequelize_1.default.STRING(100),
        allowNull: false,
        unique: true,
    },
    priceProduct: {
        type: sequelize_1.default.DOUBLE,
        allowNull: false
    },
    descriptionProduct: {
        type: sequelize_1.default.STRING(500),
        allowNull: true,
    },
    barcode: {
        type: sequelize_1.default.STRING(100),
        unique: false,
    },
    statusProduct: {
        type: sequelize_1.default.STRING(50),
        allowNull: true
    }
}, {
    freezeTableName: true,
    paranoid: true
});
