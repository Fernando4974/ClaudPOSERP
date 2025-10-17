"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerClient = void 0;
const express_1 = require("express");
const cliente_1 = require("../../infraestructura/controller/cliente");
const cliente_2 = require("../../infraestructura/controller/cliente");
exports.routerClient = (0, express_1.Router)();
exports.routerClient.post("/createClient", cliente_1.createClient);
exports.routerClient.get("/getClient", cliente_2.getClient);
