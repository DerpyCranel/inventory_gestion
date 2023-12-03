import { Router } from "express";
import { createCategory,deleteCategory,getCategories, getCategory, updateCategory } from "../controllers/categories.controller.js";
import {verifyToken} from '../middlewares/authMiddleware.js';

const router=Router();


router.post("/categories",verifyToken,createCategory);
router.get("/categories",verifyToken,getCategories);
router.get("/categories/:id",verifyToken,getCategory);  
router.patch("/categories/:id",verifyToken,updateCategory);
router.delete("/categories/:id",verifyToken,deleteCategory);



export default router;
