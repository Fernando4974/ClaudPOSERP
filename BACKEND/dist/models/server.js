"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_js_1 = __importDefault(require("../database/connection.js"));
const user_1 = require("./user");
const cliente_js_1 = require("./cliente.js");
const routesUserAuth_js_1 = require("../routes/routesUserAuth.js");
const routesProduct_js_1 = require("../routes/routesProduct.js");
const routesClients_js_1 = require("../routes/routesClients.js");
const product_js_1 = require("./product.js");
const cors_1 = __importDefault(require("cors"));
class Server {
    app;
    port;
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.DBconnection();
        this.Middleware();
        this.Router();
        this.listen();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
    Middleware() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    Router() {
        this.app.use(routesUserAuth_js_1.routerRegisterUser);
        this.app.use(routesUserAuth_js_1.routerLoginUser);
        this.app.use(routesProduct_js_1.routerRegisterProduct);
        this.app.use(routesProduct_js_1.routerGetAllProducts);
        this.app.use(routesProduct_js_1.routerGetOneProduct);
        this.app.use(routesUserAuth_js_1.authPassword);
        this.app.use(routesClients_js_1.routerClient);
    }
    async DBconnection() {
        try {
            await connection_js_1.default.authenticate();
            await user_1.User.sync({ alter: false });
            await product_js_1.Product.sync({ force: false });
            await cliente_js_1.Cliente.sync({ alter: false });
            console.log('Connection to the database has been established successfully!!.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    async DBconnection_test() {
        try {
            await connection_js_1.default.authenticate();
            console.log('Connection to the database has been established successfully!!.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}
exports.default = Server;
