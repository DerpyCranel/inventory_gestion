import {pool} from '../config/db.js';



//prueba de la conexion a la base de datos
export const ping = async(req,res)=>{
    const [result]= await pool.query('SELECT 1 + 2 AS result');
    res.json(result);
};