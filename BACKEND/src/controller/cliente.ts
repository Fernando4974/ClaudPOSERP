import { Cliente } from "../models/cliente";
import type { Request, Response } from "express";
import { Op } from "sequelize";

export const createClient = async (req: Request, res: Response) => {

    const { idType, personType, name, lastname, email, number, address, documentNumber } = req.body;

    const emailAlreadyExist: any = await Cliente.findOne({
        where:
        {
            email: email
        }
    });

    if (emailAlreadyExist) {
        console.log(`The email ${email} is already exist`);
        return res.status(409).json(`The email ${email} is already exist`);
    }
    const documentAlreadyExist: any = await Cliente.findOne(
        {
            where:
            {
                [Op.and]:
                    [
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
        await Cliente.create({
            idType: idType,
            documentNumber: documentNumber,
            personType: personType,
            name: name,
            lastname: lastname,
            email: email,
            number: number,
            address: address
        })
        res.status(201).json({
            msg: `The client ${name} ${lastname} has been created`
        })

    } catch (error) {
        res.status(400).json({
            msg: `The client ${name} ${lastname} hasn't been created for error: ${error}`,
            body: req.body
        })

    }

}













export const getClient = async (req: Request, res: Response) => {
    const { id, name, documentNumber } = req.body;

    if (id) {

        const client = await Cliente.findByPk(id);

        if (!client) {
            return res.status(404).json(`The client with id ${id} doesn't exist`);
        }

       return res.status(201).json(client);

    }else

    if (name) {

        const client = await Cliente.findOne({
            where: {
                name: name
            }
        })
        if (!client) {
            return res.status(404).json(`The client with name ${name} doesn't exist`);
        }
        return res.status(201).json(client);
    }else

    if (document) {
        const client = await Cliente.findOne({
            where: {
                documentNumber: documentNumber
            }
        })
        if (!client) {
            return res.status(404).json(`The client with document number ${documentNumber} doesn't exist`);
        }   

        return res.status(201).json(client);
    }


}

