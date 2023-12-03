import {pool} from "../config/db.js";


//funcion para agregar roles

export const createRol = async(req,res)=>{

    try {

        const{name}=req.body;
        const [rows]= await pool.query(
            "INSERT INTO roles (rol_name) VALUES (?)",
            [name]);

            res.send({
                id:rows.insertId,
                name,
                message:"datos guardados con exito"
            });
        
    } catch (error) {

        return res.status(500).json({message:"error al guardar datos",error});
        
    }
};

//funcion para traer todos los datos de roles
export const getRoles= async(req,res)=>{
    try {

        const [rows]= await pool.query("SELECT * FROM roles");
        
//validacion  de los datos a mostrar
        if(rows.length <=0){
          return res.status(404).json({
                message:"no se encuentran datos registrados"
            });
        }else{
            res.json(rows);
        }
        
    } catch (error) {
        return res.status(500).json({
            message:"problemas al obtener datos",
        });
        
    }
};


//funcion para  buscar un rol

export const  getRol= async(req,res)=>{
    
    try {

        const id= req.params.id;
        const [rows]= await pool.query("SELECT * FROM roles WHERE rol_id=?",[id]);

        //validacion de  los datos
        if(rows.length <=0){
            return res.status(404).json({message:"no se encuentran datos"});
        }else{
            res.json(rows[0]);
        }
        
    } catch (error) {
        return res.status(500).json({message:"error al obtener datos"});
        
    }  
};

//funcion para actualizar datos
export const updateRol= async(req,res)=>{
    const {id}=req.params;
    const {rol_name}=req.body;

    try {

        const [result]= await pool.query(
            "UPDATE roles SET rol_name= IFNULL(?,rol_name) WHERE rol_id=?",[rol_name,id]
        );

        //validacion para ver si se realizaron los cambios
        if(result.affectedRows === 0){
            return res.status(404).json({message:"datos no encontrados"});
        }else{
            return res.status(200).json({message:"datos actualizados"});
        }
        
    } catch (error) {
        return res.status(500).json({message:"ocurrio un error al actualizar"});
        
    }
};


export const deleteRol= async(req,res)=>{
    
    try {
        const {id}=req.params;
        const[result]=await pool.query("DELETE FROM roles WHERE rol_id=? ",[id]);

        //validacion de eliminacion de datos
        if(result.affectedRows <=0){
            return res.status(404).json({message:"datos no encontrados"});
        }else{
            return res.status(200).json({message:"datos eliminados"});

        }  
        
    } catch (error) {

        return res.status(500).json({message:"ocurrio un error"});
        
    }
};

