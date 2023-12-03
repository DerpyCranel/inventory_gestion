import jwt  from 'jsonwebtoken';

const KEY = process.env.TOKEN;


export const verifyToken=(req,res,next)=>{
    //se obtiene el token del encabezado de la solicitud
    let token= req.headers.authorization;
    //se verifica el token
    if(!token){
        return res.status(401).json({message:"token no proporcionado"});     
    }

    if(token.startsWith('Bearer ')){
        token=token.slice(7,token.length);
        console.log(token);
    }

    try {
            //se verifica y decodfica el token
            const decoded=jwt.verify(token,KEY,{ algorithm: 'HS256' });
             //se agrega el usuario decodificado a la solicitud
            req.user=decoded;
            //pasa al siguiente controlador
            next(); 
    } catch (error) {  
        return res.status(401).json({message:"token invalido",error});
    }
};