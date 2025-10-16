import { Router } from "express";
import  { createClient } from "../controller/cliente";
import { getClient} from "../controller/cliente";
export const routerClient = Router();
routerClient.post("/createClient",createClient);
routerClient.get("/getClient",getClient);
