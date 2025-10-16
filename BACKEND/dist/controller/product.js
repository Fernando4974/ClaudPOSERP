"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProduct = exports.getAllProducts = exports.registerProduct = void 0;
const sequelize_1 = require("sequelize");
const product_1 = require("../models/product");
const registerProduct = async (req, res) => {
    const { nameProduct, descriptionProduct, priceProduct, barcode, statusProduct } = req.body;
    const nameProductAlreadyExist = await product_1.Product.findOne({ where: { nameProduct: nameProduct } });
    if (nameProductAlreadyExist) {
        return res.json(`The product ${nameProduct} is already exist`);
    }
    try {
        await product_1.Product.create({
            nameProduct: nameProduct,
            descriptionProduct: descriptionProduct,
            priceProduct: priceProduct,
            barcode: barcode,
            statusProduct: statusProduct,
        });
        res.status(200).json({
            msg: `The product ${nameProduct} has been created`
        });
    }
    catch (error) {
        res.status(500).json({
            msg: `The product ${nameProduct} hasn't been create by de error ${error}`,
            body: req.body
        });
    }
};
exports.registerProduct = registerProduct;
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await product_1.Product.findAll();
        res.status(200).json(allProducts);
    }
    catch (error) {
        res.status(400), (0, sequelize_1.json)({
            msg: `The get can´t be completated by the error ${error}`
        });
    }
};
exports.getAllProducts = getAllProducts;
const getOneProduct = async (req, res) => {
    const { idProduct, nameProduct, barcode } = req.body;
    if (idProduct) {
        const productById = await product_1.Product.findOne({ where: { idProduct: idProduct } });
        return res.status(200).json(productById);
    }
    if (nameProduct) {
        const productByName = await product_1.Product.findAll({
            where: { nameProduct: { [sequelize_1.Op.like]: `%${nameProduct}%` }
            }
        });
        return res.status(200).json(productByName);
    }
    if (nameProduct) {
        const productByBarcode = await product_1.Product.findOne({ where: { barcode: { [sequelize_1.Op.like]: `%${barcode}%` } } });
        return res.status(200).json(productByBarcode);
    }
};
exports.getOneProduct = getOneProduct;
