import {pool} from '../config/db.js';
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';




//funcion para logearse al sistema
export const login=async(req,res)=>{
    //parametros a comparar
    const{user,password}=req.body;
    try {
      //consulta a la base de datos para extraer información del usuario
        const[rows]= await pool.query("SELECT * FROM usersview WHERE u_name=?",
        [user]);
        if(!rows.length){
         return res.status(404).json({message:"el usuario no esta registrado"})
        }
        //se crean las variables de usuario y contraseña  sacados de la base de datos
        let u=rows[0].u_user;
        let pass=rows[0].u_password;
        let compare=await bcryptjs.compare(password,pass);
        //validacion del usuario y contraseña
        if( (u!=user) && !compare){
           return res.status(404).json({message:"el usuario o contraseña no coincide"});
        }
        //se extrae el id  y el token del .env
         let u_id=rows[0].user_id;
         const KEY = process.env.TOKEN
         console.log(KEY)

        // crea el token
         const token = jwt.sign({
            name: user,
            id: u_id
         },KEY,{expiresIn:'7d'},{ algorithm: 'HS256'})
         res.json({token});
    //retorna un error
    } catch (error) {   
         console.log(error)
        res.status(500).json({message:"ocurrio un error",error});
    }
};