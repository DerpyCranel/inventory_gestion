import { Router } from "express";
import { insertProduct,getProducts,getProduct,updateProduct, deleteProduct } from "../controllers/products.controller.js";
import {verifyToken} from '../middlewares/authMiddleware.js';
const router=Router();


//verificacion de rutas con token
router.post("/products",verifyToken,insertProduct);
router.get("/products",verifyToken,getProducts);
router.get("/products/:id",verifyToken,getProduct);
router.patch("/products/:id",verifyToken,updateProduct);
router.delete("/products/:id",verifyToken,deleteProduct);


export default router;