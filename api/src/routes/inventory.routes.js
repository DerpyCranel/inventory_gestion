import { Router } from "express";
import { decrement, increment } from "../controllers/inventory.controller.js";
import {verifyToken} from '../middlewares/authMiddleware.js';
const router = Router();

router.patch("/inventory/increment/:id",verifyToken,increment);
router.patch("/inventory/decrement/:id",verifyToken,decrement);



export default router;