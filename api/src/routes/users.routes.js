import { Router } from "express";
import { createUser,getUsers,getUser, updateUser, deleteUser } from "../controllers/users.controller.js";
import {verifyToken} from '../middlewares/authMiddleware.js';
const router=Router();


router.post("/users",verifyToken,createUser);
router.get("/users",verifyToken,getUsers);
router.get("/users/:id",verifyToken,getUser);
router.patch("/users/:id",verifyToken,updateUser);
router.delete("/users/:id",verifyToken,deleteUser);


export default router;


