import {
  registerProduct,
  getAllProducts,
  getOneProduct,
} from "../../infraestructura/controller/product";
import { Router } from "express";
import { validateToken } from "../../infraestructura/controller/validateToken";

export const routerRegisterProduct = Router();
routerRegisterProduct.post("/api/product/register", registerProduct);
export const routerGetAllProducts = Router();
routerGetAllProducts.get("/api/product/getAll", validateToken, getAllProducts);
export const routerGetOneProduct = Router();
routerGetOneProduct.get("/api/product/getOne", getOneProduct);
