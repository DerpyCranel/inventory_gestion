import  { Router } from 'express';
import {ping} from '../controllers/pruebaConexion.controller.js';


const router=Router();

router.get('/ping',ping);

export default router;