import { Router } from "express";
import { createClient } from "../../infraestructura/controller/cliente";
import { getClient } from "../../infraestructura/controller/cliente";
export const routerClient = Router();
routerClient.post("/createClient", createClient);
routerClient.get("/getClient", getClient);
