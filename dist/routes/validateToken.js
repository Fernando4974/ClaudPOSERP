"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateToken = async (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
        try {
            const onlyToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(onlyToken, process.env.SECRET_KEY || "890sfd798s56423jk");
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: `Token invalido o expirado : ${error}`,
                body: headerToken
            });
        }
    }
    else {
        res.status(400).json({
            msg: 'Acceso denegado: No se proporcionó un token o el formato es incorrecto.',
            body: headerToken
        });
    }
};
exports.validateToken = validateToken;
