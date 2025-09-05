"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('api_nodejs', 'root', 'admin', {
    dialect: 'mysql', // Change to 'mysql' for MySQL database
    host: 'localhost',
    //   storage: './database.sqlite',
    //   logging: false, // Disable logging for cleaner output
});
exports.default = sequelize;
