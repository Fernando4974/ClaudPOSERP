import { registerProduct,getAllProducts } from "../controller/product";
import { Router } from "express";
import { validateToken } from "../controller/validateToken";

export const routerRegisterProduct = Router();
routerRegisterProduct.post("/api/product/register",registerProduct);
export const routerGetAllProducts = Router();
routerGetAllProducts.get("/api/product/getAll",validateToken, getAllProducts)