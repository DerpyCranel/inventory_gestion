import { Router } from "express";

import { getRoles,createRol,getRol,updateRol,deleteRol } from "../controllers/roles.controller.js";
import {verifyToken} from '../middlewares/authMiddleware.js';
const router=Router();


//rutas para roles
router.get("/roles",verifyToken,getRoles);
router.post("/roles",verifyToken,createRol);
router.get("/roles/:id",verifyToken,getRol);
router.patch("/roles/:id",verifyToken,updateRol);
router.delete("/roles/:id",verifyToken,deleteRol);

export default router;