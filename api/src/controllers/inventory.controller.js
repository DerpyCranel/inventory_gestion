import {pool} from"../config/db.js";



//incrementa el inventario 
export const increment=async(req,res)=>{
    const{id}=req.params;

    try {

        /*

        *selecciona el stock actual de la base de datos
        *incrementa el stock y lo actualiza en la base de datos

        */
        const query=  await pool.query("SELECT inventory_stock FROM  INVENTORY WHERE product_id=?",[id]);
        const stock= query[0];
        const stockOld=stock[0].inventory_stock;
        const newStock =stockOld+1;
        const[result]= await  pool.query("UPDATE INVENTORY SET inventory_stock=IFNULL(?,inventory_stock) WHERE product_id=?",
        [newStock,id]);
        
        //validación para ver si se actualizo correctamente
        if(result.affectedRows<=0){
            return  res.status(404).json({message:"no se pudo  actualizar"});
        }else{
            return res.status(200).json({message:"se actualizo"});
        }

    } catch (error) {
        //retorna un mensaje de error
        res.status(500).json({message:"ocurrio un error",error});
    }

};


//incrementa el inventario 
export const decrement=async(req,res)=>{
    const{id}=req.params;

    try {


        /*

        *selecciona el stock actual de la base de datos
        *decrementa el stock y lo actualiza en la base de datos
        
        */
        const query=  await pool.query("SELECT inventory_stock FROM  INVENTORY WHERE product_id=?",[id]);
        const stock= query[0];
        const stockOld=stock[0].inventory_stock;
        const newStock =stockOld-1;

        //validación  para cuando el stock llegue a 0 ya no se pueda actualizar
        if(newStock<0){
            return  res.status(404).json({message:"el stock ya es 0"});
        }
        const[result]= await  pool.query("UPDATE INVENTORY SET inventory_stock=IFNULL(?,inventory_stock) WHERE product_id=?",
        [newStock,id]);
        
        //validación para ver si se actualizo correctamente
        if(result.affectedRows<=0){
            return  res.status(404).json({message:"no se pudo  actualizar"});
        }else{
            return res.status(200).json({message:"se actualizo"});
        }

    } catch (error) {
        //retorna un mensaje de error
        res.status(500).json({message:"ocurrio un error",error});
    }

};