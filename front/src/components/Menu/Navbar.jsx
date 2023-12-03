import Cookies from "universal-cookie";
import { Link,useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import avatar from "../../assets/img/unknown.png"
import {FaAlignJustify,FaUserTimes}  from 'react-icons/fa';
import { useEffect } from "react";
import { Avatar } from "flowbite-react";

export const Navbar=()=>{
    const cookies = new Cookies();
    const user= cookies.get("user");
    const navigation=useNavigate();
     //boton de cerrar sesión
  const logOut =(event) => {
      event.preventDefault();
      cookies.remove("auth");
      cookies.remove("user");
      navigation('/');
  };
 
 
  useEffect(()=>{
   if(!cookies.get('auth')){
       navigation('/');
   }
  },[navigation]);  

    return(
        <>
        

        
<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <FaAlignJustify/>
         </button>
        <a className="flex ml-2 md:mr-24">
          <img src={logo} className="h-8 mr-3" alt="FlowBite Logo" />
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Inventario</span>
        </a>
      </div>

    </div>
  </div>
</nav>

<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul className="space-y-2 font-medium">

      <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <Avatar
            img={avatar}
            status="online"
            rounded
            >
            <div className="space-y-1 font-medium dark:text-white">
               <div>
                  {user}
               </div>
            </div>

            </Avatar>
         </li>
         <li>
         <Link to="/">
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="flex-1 ml-3 whitespace-nowrap">
                Inicio 
               </span>
            </div>
         </Link>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               
               <span className="flex-1 ml-3 whitespace-nowrap">Inventario</span>
               <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="flex-1 ml-3 whitespace-nowrap">Productos</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="flex-1 ml-3 whitespace-nowrap">Categorias</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </a>
         </li>
         <li>
         <Link to="users">
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span className="flex-1 ml-3 whitespace-nowrap">
                Usuarios 
               </span>
            </div>
         </Link>
         </li>

         <li>
         <Link to="roles">
            <div  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">  
               <span className="flex-1 ml-3 whitespace-nowrap">
                Roles
                </span>
            </div>
         </Link>
         </li>

         <li style={{cursor:'pointer'}} onClick={logOut} >
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-red-100 hover:bg-red-200 dark:hover:bg-red-200" >
               <span className="flex-1 ml-3 whitespace-nowrap">
                  Cerrar sesión 
               </span>
            </div>
         </li>
      
      </ul>
   </div>
</aside>



      
        
        
        </>
    )
};