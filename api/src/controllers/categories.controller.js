import {pool}  from '../config/db.js';


//funcion para agregar categorias

export const createCategory=async(req,res)=>{

   

    try {

        const{c_name,c_status}=req.body;
        const [rows]= await pool.query("INSERT INTO CATEGORIES (c_name,c_status) VALUES (?,?)",
        [c_name,c_status]);

        res.send({
            id:rows.affectedRows,
            c_name,
            c_status,
            message:"datos guardados con exito"
        });

    } catch (error) {

        return res.status(500).json({message:'ocurrio un error'});
        
    }

};


//funcion para mostrar datos


export const getCategories=async(req,res)=>{

    try {

        const[rows]=await pool.query("SELECT * FROM CATEGORIES");

        res.send(rows);
        
    } catch (error) {
        res.status(500).json({message:'ocurrio un error',error});
    }
};


export const  getCategory= async(req,res)=>{
    try {

        const {id}=req.params;
        const [rows]= await pool.query("SELECT * FROM CATEGORIES WHERE category_id=?",[id]);
        if(rows==0){
            res.status(404).json({message:"no se encuetran datos"});
        }else{
            res.send(rows);

        }
       

        
    } catch (error) {
        return res.status(500).json({message:"ocurrio un error"});
    }
};



//funcion para editar 


export const updateCategory=async(req,res)=>{

    const {c_name,c_status}=req.body;
    const {id}=req.params;
    try {

        const [result]= await pool.query("UPDATE CATEGORIES SET c_name=IFNULL(?,c_name),c_status=IFNULL(?,c_status)  where category_id=?",
        [c_name,c_status,id]);

        if(result.affectedRows===0){
            res.status(404).json({message:"no se encuetran datos"});
        }else{
            res.status(200).json({message:"datos actualizados"})
        }
        
        
    } catch (error) {

        res.status(500).json({message:"ocurrio un error"});
        
    }
};

//funcion para eliminar datos

export const deleteCategory=async(req,res)=>{
    const {id}=req.params;

    try {

        const[result]= await pool.query("DELETE FROM  CATEGORIES WHERE category_id=?",[id]);

        if(result.affectedRows===0){
            res.status(404).json({message:"no se encuentran datos"});
        }else{
            res.status(200).json({message:"se eliminaron datos"});
        }
        
    } catch (error) {

        res.status(500).json({message:"ocurrio un error",error});
        
    }

};