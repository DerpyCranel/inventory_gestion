import { pool } from "../config/db.js";

import bcryptjs from "bcryptjs";

//funcion para agregar usuarios

export const createUser=async(req,res)=>{

    try {

        const{u_email,u_name,u_password,u_status,rol_id}=req.body;
        let pass_hash= await bcryptjs.hash(u_password,8);
        const[rowsCompare]=await pool.query("SELECT u_email,u_name  FROM USERS WHERE u_email=? AND u_name=? ",[u_email,u_name]);
        if(rowsCompare.affectedRows==0){
            
        const [rows]= await pool.query(
            "INSERT INTO USERS (u_email,u_name,u_password,u_status,rol_id) VALUES (?,?,?,?,?)",
            [u_email,u_name,pass_hash,u_status,rol_id]);

            if(rows){
                            
            res.send({
                id:rows.insertId,
                u_email,
                u_name,
                pass_hash,
                u_status,
                rol_id,
                message:"datos registrados"
            });

            }else{
                res.send({message:'No se guardaron los datos'});
            }
            


        }else{
            res.send({message:"ya existe  el correo y usuario, ingrese otro diferente"},500);
        }


        
    } catch ( error) {
        return res.status(500).json({message:"ocurrio un error",error},500);
    }


};


//funcion para traer todos los usuarios


export const getUsers=async(req,res)=>{
    
    try {

        const [rows]=await pool.query("SELECT  USERS.user_id,USERS.u_email,USERS.u_name,USERS.u_password,USERS.u_status,USERS.rol_id,ROLES.rol_name FROM USERS INNER JOIN ROLES ON USERS.rol_id=ROLES.rol_id");
       if(rows.length<=0){
        res.status(404).json({message:"no se encontraron datos"});
       }else{
        res.json(rows);
       }
        
    } catch (error) {

        res.status(500).json({message:"ocurrio un error"});
        
    }
};


//FUNCION PARA  MOSTRAR 1 USUARIO 


export const getUser=async(req,res)=>{
   

    try {

        const {id}=req.params;
        const [rows]=  await pool.query("SELECT  USERS.user_id,USERS.u_email,USERS.u_name,USERS.u_password,USERS.u_status,USERS.rol_id,ROLES.rol_name FROM USERS INNER JOIN ROLES ON USERS.rol_id=ROLES.rol_id WHERE user_id=?",
        [id]);

        if(rows.length<=0){
            res.status(404).json({message:"no se encuetran datos"});
        }else{
            res.send(rows);
        }
        
    } catch (error) {
        res.status(500).json({message:"ocurrio un error"});
    }
};



//funcion para editar datos

export const updateUser=async(req,res)=>{
    const {id}=req.params;
    const{u_email,u_name,u_pass,u_status,rol_id}=req.body;
    
    try {
        //validacion para actualizar contraseña o no
        if(u_pass==""){
            const[result]= await pool.query("UPDATE USERS SET u_email= IFNULL(?,u_email),u_name=IFNULL(?,u_name),u_status=IFNULL(?,u_status),rol_id=IFNULL(?,rol_id) WHERE user_id=?",
            [u_email,u_name,u_status,rol_id,id]);
        
            if(result.affectedRows==0){
                res.status(404).json({message:"no se encuentran datos"});
            }else{
                res.status(200).json({message:"datos actualizados"});
            }
        }else{
            const u_password= await bcryptjs.hash(u_pass,8);
            const[result]= await pool.query("UPDATE USERS SET u_email= IFNULL(?,u_email),u_name=IFNULL(?,u_name),u_password=IFNULL(?,u_password),u_status=IFNULL(?,u_status),rol_id=IFNULL(?,rol_id) WHERE user_id=?",
            [u_email,u_name,u_password,u_status,rol_id,id]);
        
            if(result.affectedRows==0){
                res.status(404).json({message:"no se encuentran datos"});
            }else{
                res.status(200).json({message:"datos actualizados"});
            }
        }
    

        
    } catch (error) {
        res.status(500).json({message:"ocurrio un error",error});
    }
};


//funcion para eliminar usuario

export const deleteUser= async(req,res)=>{
    const {id}=req.params;

    try {

        const[result]= await pool.query("DELETE FROM USERS WHERE user_id=?",[id]);
        if(result.affectedRows<=0){
            res.status(404).json({message:"no se encuetran datos"});
        }else{
            res.status(200).json({message:"datos eliminados"});
        }
        
    } catch (error) {

        res.status(500).json({message:"ocurrio un error"},error);
        
    }
};