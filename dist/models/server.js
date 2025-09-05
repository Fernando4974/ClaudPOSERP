"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../database/connection"));
const user_1 = require("./user");
const routesUser_1 = require("../routes/routesUser");
class Server {
    app;
    port;
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.DBconnection();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
    Middleware() {
        this.app.use(express_1.default.json());
    }
    Router() {
        this.app.use(routesUser_1.routerRegisterUser);
    }
    async DBconnection() {
        try {
            await connection_1.default.authenticate();
            await user_1.User.sync({ force: true });
            console.log('Connection to the database has been established successfully!!.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    async DBconnection_test() {
        try {
            await connection_1.default.authenticate();
            console.log('Connection to the database has been established successfully!!.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}
exports.default = Server;
