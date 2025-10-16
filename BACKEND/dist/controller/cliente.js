"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = exports.createClient = void 0;
const cliente_1 = require("../models/cliente");
const sequelize_1 = require("sequelize");
const createClient = async (req, res) => {
    const { idType, personType, name, lastname, email, number, address, documentNumber } = req.body;
    const emailAlreadyExist = await cliente_1.Cliente.findOne({
        where: {
            email: email
        }
    });
    if (emailAlreadyExist) {
        console.log(`The email ${email} is already exist`);
        return res.status(409).json(`The email ${email} is already exist`);
    }
    const documentAlreadyExist = await cliente_1.Cliente.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { idType: idType },
                { documentNumber: documentNumber }
            ]
        }
    });
    if (documentAlreadyExist) {
        console.log(`The document number ${documentNumber} is already exist for the type ${idType}`);
        return res.status(409).json(`The document number ${documentNumber} is already exist for the type ${idType}`);
    }
    try {
        await cliente_1.Cliente.create({
            idType: idType,
            documentNumber: documentNumber,
            personType: personType,
            name: name,
            lastname: lastname,
            email: email,
            number: number,
            address: address
        });
        res.status(201).json({
            msg: `The client ${name} ${lastname} has been created`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `The client ${name} ${lastname} hasn't been created for error: ${error}`,
            body: req.body
        });
    }
};
exports.createClient = createClient;
const getClient = async (req, res) => {
    const { id, name, documentNumber } = req.body;
    if (id) {
        const client = await cliente_1.Cliente.findByPk(id);
        if (!client) {
            return res.status(404).json(`The client with id ${id} doesn't exist`);
        }
        return res.status(201).json(client);
    }
    else if (name) {
        const client = await cliente_1.Cliente.findOne({
            where: {
                name: name
            }
        });
        if (!client) {
            return res.status(404).json(`The client with name ${name} doesn't exist`);
        }
        return res.status(201).json(client);
    }
    else if (document) {
        const client = await cliente_1.Cliente.findOne({
            where: {
                documentNumber: documentNumber
            }
        });
        if (!client) {
            return res.status(404).json(`The client with document number ${documentNumber} doesn't exist`);
        }
        return res.status(201).json(client);
    }
};
exports.getClient = getClient;
