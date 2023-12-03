import {pool} from"../config/db.js";
import  multer  from 'multer';
import fs from 'fs';

//funcion para  insertar datos
export const insertProduct=async(req,res)=>{

    try {

        //metodo para cargar al servidor la foto
        const storage= multer.diskStorage({

            destination:function(req,file,cb){
                cb(null,'src/uploads/img/products/')
                
            },
            //esta funcion nombra el archivo con la fecha actual y su nombre original
            filename:function(req,file,cb){

                if(file.mimetype!="image/jpeg" && file.mimetype!="image/jpg" && file.mimetype!="image/png"){
                    res.status(400).json({message:"no se admiten archivos que no sean imagenes"})
        
                }else{
                cb(null,`${file.originalname}`)  
                }   
            }
        });

             //variable para  guardar en el servidor 
        const upload=multer({storage:storage}).single('p_photo');

        upload(req,res,async(err)=>{
            //condicional  para checar errores al cargar archivos
            if(err){
                res.status(400).json({message:"error al cargar",error:err})
            }

            //parametros por metodo post para guardar en la base de datos
            const p_photo='src/uploads/img/products/'+ req.file.originalname;
            const{category_id,p_name,p_model,p_detail,p_status}=req.body;
            const [rows]= await pool.query("INSERT INTO  PRODUCTS (category_id,p_name,p_model,p_photo,p_detail,p_status) VALUES (?,?,?,?,?,?)",
            [category_id,p_name,p_model,p_photo,p_detail,p_status]);

            res.send({
                id:rows.insertId,
                category_id,
                p_name,
                p_model,
                p_photo,
                p_detail,
                p_status,
                message:"datos guardados"
            });
            
        });


        
    } catch (error) {
        //devuelve un error por si ocurre algo en el bloque anterior
        res.status(500).json({message:"ocurrio un error",error:error});
        
    }
    
};


//funcion para mostrar  productos

export const getProducts=async(req,res)=>{

    

    try {

        //trae todos los datos de la base y se valida por si no hay datos por mostrar
        const[rows]= await  pool.query("SELECT  PRODUCTS.product_id,CATEGORIES.c_name,CATEGORIES.category_id,PRODUCTS.p_name,PRODUCTS.p_model,PRODUCTS.p_photo,PRODUCTS.p_detail,PRODUCTS.p_status FROM PRODUCTS  INNER JOIN CATEGORIES ON PRODUCTS.category_id=CATEGORIES.category_id");

        if(rows.length<=0){
            res.status(404).json({message:"no se encontraron datos"});
        }else{
            res.json(rows);
        }
 
    } catch (error) {

        //devuelve un mensaje por si ocurre un error
        res.status(500).json({message:"ocurrio un error", error});
        
    }
};


//funcion para  mostrar 1 producto

export const getProduct= async(req,res)=>{

    const {id}=req.params;

    try {

         //trae todos los datos de la base y se valida por si no hay datos por mostrar
         const[rows]= await  pool.query("SELECT  PRODUCTS.product_id,CATEGORIES.c_name,CATEGORIES.category_id,PRODUCTS.p_name,PRODUCTS.p_model,PRODUCTS.p_photo,PRODUCTS.p_detail,PRODUCTS.p_status FROM PRODUCTS  INNER JOIN CATEGORIES ON PRODUCTS.category_id=CATEGORIES.category_id WHERE product_id=?",
         [id]);

         if(rows.length<=0){
             res.status(404).json({message:"no se encontraron datos"});
         }else{
             res.json(rows);
         }


        
    } catch (error) {
        //devuelve un mensaje de error
        res.status(500).json({message:"ocurrio un error"})  
    }
};



//funcion para actualizar productos
export const updateProduct= async(req,res)=>{

    const {id}=req.params;

    try {
        /*
        * se hace una consulta a la base de datos para extrear la url del archivo
        * se extrae el json en la posicón deseada para mostrar el url
        */
        const queryPhoto=  await pool.query("SELECT p_photo FROM PRODUCTS WHERE product_id =?",
        [id]);
        const old=queryPhoto[0];
        const oldPhoto=old[0].p_photo;

          //metodo para cargar al servidor la foto
          const storage= multer.diskStorage({
            destination:function(req,file,cb){
                cb(null,'src/uploads/img/products/')    
            },
            //esta funcion nombra el archivo con la fecha actual y su nombre original
            filename:function(req,file,cb){
                if(file.mimetype!="image/jpeg" && file.mimetype!="image/jpg" && file.mimetype!="image/png"){
                  return  res.status(400).json({message:"no se admiten archivos que no sean imagenes"})
                }else{
                cb(null,`${file.originalname}`)  
                }   
            }
        });
             //variable para  guardar en el servidor 
        const upload=multer({storage:storage}).single('p_photo');
        upload(req,res,async(err)=>{
            //condicional  para checar errores al cargar archivos
            if(err){
               return res.status(400).json({message:"error al cargar",error:err})
            }

            //se elimina el archivo anterior del servidor
            fs.unlink(oldPhoto,(err)=>{
                if(err){
                  return  res.status(500).json({message:"ocurrio un error, no se pudo eliminar el archivo"});
                }

            });

            //parametros por metodo post para guardar en la base de datos
            const p_photo='src/uploads/img/products/'+ req.file.originalname;
            const{category_id,p_name,p_model,p_detail,p_status}=req.body;
            const [rows]= await pool.query("UPDATE PRODUCTS SET category_id=IFNULL(?,category_id),p_name=IFNULL(?,p_name),p_model=IFNULL(?,p_model),p_photo=IFNULL(?,p_photo),p_detail=IFNULL(?,p_detail),p_status=IFNULL(?,p_status) WHERE product_id=?",
            [category_id,p_name,p_model,p_photo,p_detail,p_status,id]);

            if(rows.affectedRows<=0){
              return  res.status(404).json({message:"no se actualizaron los datos"});
            }else{
               return res.status(200).json({message:"datos actualizados"})
            }  
        });

    } catch (error) {
        //retorna un mensaje por si ocurre un error
       return res.status(500).json({message:"ocurrio un error",error});
    }

};


//funcion para eliminar  productos
export const deleteProduct=async(req,res)=>{
    const {id}=req.params;

    try {
        /*
        *se realiza una query para extraer el url del archivo
        *se elimina el archivo del servidor
        *se eliminan la informacion de la base de datos
        */
       const queryPhoto= await pool.query("SELECT  p_photo  FROM PRODUCTS  WHERE product_id=?",[id]);
       const old=queryPhoto[0];
       const oldPhoto=old[0].p_photo;
       //funcion para eliminar
       fs.unlink(oldPhoto,(err)=>{
        if(err){
            return res.status(500).json({message:"no se pudo eliminar la foto del servidor"});
        }
       });
       //funcion para eliminar los datos
       const [result]= await  pool.query("DELETE FROM  PRODUCTS  WHERE product_id=?",[id]);
       if(result.affectedRows<=0){
        return  res.status(404).json({message:"no se  pudieron eliminar los datos"});
       }else{
        return  res.status(200).json({message:"datos eliminados"});
       }

    } catch (error) {
        //retorna un mensaje de error
        res.status(500).json({message:"ocurrio un error"});    
    }
};