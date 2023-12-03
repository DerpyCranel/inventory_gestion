import { useState,useEffect,Component } from "react";
import fondo  from "../../assets/img/login/fondo2.jpg";
import axios from "axios";
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { useNavigate,redirect } from "react-router-dom";

export const Login  =()=>{
    const url='http://localhost:3000/login';
    const cookies= new Cookies();
    const navigation=useNavigate();
     //se declara el hook para ls variables del formulario
    const[formData,setFormData]=useState({
        user:'',
        password:''
    });
   
    //se cambia las variables segun el valor
   const handleChange= (event)=>{
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
  });
 };

//arroja los resultados despues de enviar los datos desde el formulario
   const handleSubmit= async(event)=>{
     event.preventDefault();
    //se extrae los valores del formulario
    const {user,password}=formData;
   
   try{
    //se hace la peticion a la api para el incio de sesión
    const response=await axios.post(url,{
        user,
        password
    });
    //se declara el token 
    const token=response.data.token;
    cookies.set('auth',token,{path:'/'});
    cookies.set('user',user);
    //redirige al componente home
   navigation('/');
    
   }catch (error){
    //muestra el error en una alerta
    const messageError=error.response.data.message;

    Swal.fire({
        position: 'top-end',
        title: 'Error!',
        text: messageError,
        icon: 'error',
        confirmButtonText: 'Continuar'
      });

   }
   };

   useEffect(()=>{
    if(cookies.get('auth')){
       navigation("/");
       
    }
   },[cookies,navigation]);
   
    return(
        <>
       
       
        <section className=" flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500    ">
            <div className="bg-transparent text-2xl  flex    ">

                <div className=" ">
                <img src={fondo} alt="login" className="max-w-md  w-full h-full  rounded-l-2xl " />
                </div>

                <form onSubmit={handleSubmit} action="" method="post" className=" pl-10 pr-10 max-w-md bg-gray-50  rounded-r-2xl">
                    <div className="p-5">  

                    <h1 className=" text-black text-4xl ">Iniciar sesión</h1>

                    <div className="pt-5">
                        <label>Usuario</label>
                        <br/>
                        <input onChange={handleChange}   className=" border-2 border-slate-400 h-10  " type="text" name="user" id="user" placeholder=" usuario"/>
                    </div>

                    <div className="pt-5">
                        <label>Contraseña</label>
                        <br/>
                        <input onChange={handleChange} className=" border-2 border-slate-400 h-10  " type="password" name="password" id="password" placeholder=" contraseña"/>
                    </div>

                    <div>
                        <br/>
                    <input  type="submit" value="Iniciar sesión"  className=" justify-center  p-2  max-w-4xl text-slate-50  bg-violet-500"/>
                    </div>   

                    </div>  
                </form>
                
            </div>
        </section>
        
        </>
    )

};